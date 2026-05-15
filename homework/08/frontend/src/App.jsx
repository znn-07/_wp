import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function App() {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchNews = async (query = '') => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/news/search?q=${query}`);
      setNews(res.data);
    } catch (err) {
      console.error("後端還沒開喔！請記得跑 node server.js", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, []);

  return (
    <div className="app-container">
      <header>
        <h1>[ TECH_MINIMALIST_PORTAL ]</h1>
        <div className="search-box">
          <input 
            type="text" 
            placeholder="搜尋科技關鍵字..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchNews(search)}
          />
          <button onClick={() => fetchNews(search)}>SCAN</button>
        </div>
      </header>
      <main>
        {loading ? <p className="loading">系統掃描中...</p> : (
          <div className="news-grid">
            {news.map(item => (
              <article key={item._id} className="news-card">
                {item.mainImage && <img src={item.mainImage} className="card-img" />}
                <div className="card-body">
                  <span className="source">{item.siteName}</span>
                  <h2>{item.title}</h2>
                  <div className="content-preview">
                    <ReactMarkdown>{item.content.substring(0, 150) + '...'}</ReactMarkdown>
                  </div>
                  <a href={item.sourceUrl} target="_blank">READ_MORE</a>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;