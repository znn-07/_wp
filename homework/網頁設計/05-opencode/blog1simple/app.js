const express = require('express');
const path = require('path');
const { initDB, getDB, saveDB } = require('./database');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const db = getDB();
  const posts = db.exec('SELECT * FROM posts ORDER BY created_at DESC');
  const postList = posts[0] ? posts[0].values.map(row => ({
    id: row[0],
    title: row[1],
    content: row[2],
    created_at: row[3]
  })) : [];
  res.render('index', { posts: postList });
});

app.get('/post/new', (req, res) => {
  res.render('new');
});

app.post('/post', (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const db = getDB();
    db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
    saveDB();
  }
  res.redirect('/');
});

app.get('/post/:id', (req, res) => {
  const db = getDB();
  const result = db.exec('SELECT * FROM posts WHERE id = ?', [req.params.id]);
  if (result[0] && result[0].values.length > 0) {
    const row = result[0].values[0];
    const post = {
      id: row[0],
      title: row[1],
      content: row[2],
      created_at: row[3]
    };
    res.render('post', { post });
  } else {
    res.redirect('/');
  }
});

app.post('/post/:id/delete', (req, res) => {
  const db = getDB();
  db.run('DELETE FROM posts WHERE id = ?', [req.params.id]);
  saveDB();
  res.redirect('/');
});

async function start() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Blog running at http://localhost:${PORT}`);
  });
}

start();
