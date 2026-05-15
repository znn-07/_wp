const searchBtn = document.getElementById('searchBtn'); // 取得搜尋按鈕和輸入框的 DOM 元素
const searchInput = document.getElementById('searchInput'); // 取得搜尋按鈕和輸入框的 DOM 元素
const newsContainer = document.getElementById('newsContainer'); // 取得新聞容器的 DOM 元素
const clearBtn = document.getElementById('clearBtn'); // 取得清除按鈕的 DOM 元素

// 點擊按鈕時觸發
searchBtn.addEventListener('click', () => {
    const keyword = searchInput.value.trim(); 
    fetchNews(keyword);
});

// 核心功能：向後端請求資料
async function fetchNews(q = '') {
    try {
        newsContainer.innerHTML = '<p>載入中...</p>';
        
        // 呼叫你剛寫好的後端路由，帶入查詢參數
        const response = await fetch(`/api/news?q=${q}`);
        const articles = await response.json();
        // 將資料渲染到頁面上
        displayNews(articles);
    } catch (error) {
        console.error('抓取失敗:', error);
        newsContainer.innerHTML = '<p>抱歉，暫時無法取得新聞。</p>';
    }
}
// 格式化日期顯示
function formatDate(isoString) {
    if (!isoString) return '無刊登日期';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '無刊登日期';
    // 使用台灣地區的日期格式
    return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 監聽輸入事件：有字就顯示叉叉，沒字就隱藏
searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
});

// 點擊叉叉的動作
clearBtn.addEventListener('click', () => {
    searchInput.value = ''; // 清空文字
    clearBtn.style.display = 'none'; // 隱藏按鈕
    searchInput.focus(); // 讓游標回到輸入框
});

// 將資料渲染成 HTML 卡片
function displayNews(articles) {
    if (!Array.isArray(articles) || articles.length === 0) {
        newsContainer.innerHTML = '<p>找不到相關新聞。</p>';
        return;
    }
    // 使用 map 迭代每篇文章，生成對應的 HTML 結構，最後用 join() 連接成一個完整的字串
    newsContainer.innerHTML = articles.map(art => `
        <div class="news-card">
            <img src="${art.urlToImage || 'https://via.placeholder.com/150'}" alt="news">
            <div class="news-content">
                <h3>${art.title}</h3>
                <p>${art.description || '點擊閱讀更多內容...'}</p>
                <a href="${art.url}" target="_blank">Read More →</a>
                <div class="news-meta"> ↪︎ Published at: ${formatDate(art.publishedAt)}</div>
            </div>
        </div>
    `).join('');
}

// 頁面載入時先跑一次預設內容
fetchNews();

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});