const express = require('express');
const path = require('path');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { initDB, getDB, saveDB } = require('./database');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'blog-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
}

function getCurrentUser(req) {
  if (!req.session.userId) return null;
  const db = getDB();
  const result = db.exec('SELECT id, username FROM users WHERE id = ?', [req.session.userId]);
  if (result[0] && result[0].values.length > 0) {
    return { id: result[0].values[0][0], username: result[0].values[0][1] };
  }
  return null;
}

function getUserStats(userId) {
  const db = getDB();
  const myPosts = db.exec('SELECT COUNT(*) FROM posts WHERE author_id = ?', [userId]);
  const myPostsCount = myPosts[0] ? myPosts[0].values[0][0] : 0;
  const allPosts = db.exec('SELECT COUNT(*) FROM posts');
  const allPostsCount = allPosts[0] ? allPosts[0].values[0][0] : 0;
  return { myPostsCount, allPostsCount };
}

app.use((req, res, next) => {
  res.locals.currentUser = getCurrentUser(req);
  next();
});

app.get('/', (req, res) => {
  res.redirect('/public');
});

app.get('/public', (req, res) => {
  const db = getDB();
  const posts = db.exec(`
    SELECT posts.*, users.username,
    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) as comment_count
    FROM posts 
    LEFT JOIN users ON posts.author_id = users.id 
    ORDER BY created_at DESC
  `);
  const postList = posts[0] ? posts[0].values.map(row => ({
    id: row[0],
    title: row[1],
    content: row[2],
    author_id: row[3],
    created_at: row[4],
    author: row[5] || 'Anonymous',
    comment_count: row[6] || 0
  })) : [];
  
  let stats = null;
  if (req.session.userId) {
    stats = getUserStats(req.session.userId);
  }
  
  res.render('public', { posts: postList, stats, currentPage: 'public' });
});

app.get('/my-posts', requireAuth, (req, res) => {
  const db = getDB();
  const posts = db.exec(`
    SELECT posts.*, 
    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) as comment_count
    FROM posts 
    WHERE author_id = ? 
    ORDER BY created_at DESC
  `, [req.session.userId]);
  const postList = posts[0] ? posts[0].values.map(row => ({
    id: row[0],
    title: row[1],
    content: row[2],
    author_id: row[3],
    created_at: row[4],
    comment_count: row[5] || 0
  })) : [];
  
  const stats = getUserStats(req.session.userId);
  res.render('myposts', { posts: postList, stats, currentPage: 'my-posts' });
});

app.get('/register', (req, res) => {
  res.render('register', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const db = getDB();
  
  const existing = db.exec('SELECT id FROM users WHERE username = ?', [username]);
  if (existing[0] && existing[0].values.length > 0) {
    return res.render('register', { error: 'Username already exists' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
  saveDB();
  
  const result = db.exec('SELECT id FROM users WHERE username = ?', [username]);
  req.session.userId = result[0].values[0][0];
  req.session.username = username;
  res.redirect('/my-posts');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = getDB();
  
  const result = db.exec('SELECT * FROM users WHERE username = ?', [username]);
  if (result[0] && result[0].values.length > 0) {
    const user = {
      id: result[0].values[0][0],
      username: result[0].values[0][1],
      password: result[0].values[0][2]
    };
    
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.session.userId = user.id;
      req.session.username = user.username;
      return res.redirect('/my-posts');
    }
  }
  res.render('login', { error: 'Invalid username or password' });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/public');
});

app.get('/post/new', requireAuth, (req, res) => {
  res.render('new');
});

app.post('/post', requireAuth, (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const db = getDB();
    db.run('INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)', 
      [title, content, req.session.userId]);
    saveDB();
  }
  res.redirect('/my-posts');
});

app.get('/post/:id', (req, res) => {
  const db = getDB();
  const result = db.exec('SELECT posts.*, users.username FROM posts LEFT JOIN users ON posts.author_id = users.id WHERE posts.id = ?', [req.params.id]);
  if (result[0] && result[0].values.length > 0) {
    const row = result[0].values[0];
    const post = {
      id: row[0],
      title: row[1],
      content: row[2],
      author_id: row[3],
      created_at: row[4],
      author: row[5] || 'Anonymous'
    };
    
    const comments = db.exec('SELECT comments.*, users.username FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.created_at DESC', [req.params.id]);
    const commentList = comments[0] ? comments[0].values.map(row => ({
      id: row[0],
      post_id: row[1],
      user_id: row[2],
      content: row[3],
      created_at: row[4],
      author: row[5] || 'Anonymous'
    })) : [];
    
    res.render('post', { post, comments: commentList });
  } else {
    res.redirect('/public');
  }
});

app.post('/post/:id/comment', requireAuth, (req, res) => {
  const { content } = req.body;
  if (content && content.trim()) {
    const db = getDB();
    db.run('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', 
      [req.params.id, req.session.userId, content.trim()]);
    saveDB();
  }
  res.redirect('/post/' + req.params.id);
});

app.post('/post/:id/delete', requireAuth, (req, res) => {
  const db = getDB();
  db.run('DELETE FROM comments WHERE post_id = ?', [req.params.id]);
  db.run('DELETE FROM posts WHERE id = ? AND author_id = ?', [req.params.id, req.session.userId]);
  saveDB();
  const referer = req.headers.referer || '/my-posts';
  res.redirect(referer.includes('/my-posts') ? '/my-posts' : '/public');
});

async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Blog running at http://localhost:${PORT}`);
  });
}

start();
