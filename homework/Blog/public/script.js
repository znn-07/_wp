const searchBtn = document.getElementById('searchBtn'); // 搜尋按鈕
const searchInput = document.getElementById('searchInput'); // 搜尋輸入框
const newsContainer = document.getElementById('newsContainer'); // 新聞列表容器
const clearBtn = document.getElementById('clearBtn'); // 清除搜尋輸入的按鈕
const pageNav = document.getElementById('pageNav'); // 分頁導航容器

const PAGE_SIZE = 20;
let currentPage = 1;
let currentKeyword = '';
let totalResults = 0;

 // 這裡的變數用來追蹤目前的搜尋關鍵字、頁碼和總結果數，以便在分頁導航中使用
searchBtn.addEventListener('click', () => {
    const keyword = searchInput.value.trim();
    currentKeyword = keyword;
    currentPage = 1;
    fetchNews(keyword);
});

 // 當使用者點擊搜尋按鈕時，會更新 currentKeyword 和 currentPage 這兩個變數，然後呼叫 fetchNews() 函式來抓取新聞資料。這樣在分頁導航中就能根據 currentKeyword 和 currentPage 來正確地顯示對應的新聞內容。
async function fetchNews(keyword = '') {
    try {
        newsContainer.innerHTML = '<p style="text-align:center;padding:40px;">載入中...</p>';
        pageNav.innerHTML = '';

        const response = await fetch(`/api/news?q=${keyword}&page=${currentPage}&pageSize=${PAGE_SIZE}`);
        const data = await response.json();
        totalResults = data.totalResults;
        renderNews(data);
    } catch (error) {
        console.error('抓取失敗:', error);
        newsContainer.innerHTML = '<p>抱歉，暫時無法取得新聞。</p>';
    }
}

function formatDate(isoString) {
    if (!isoString) return '無刊登日期';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '無刊登日期';
    return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

searchInput.addEventListener('input', () => {
    clearBtn.style.display = searchInput.value.length > 0 ? 'block' : 'none';
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    searchInput.focus();
});

function renderNews(data) {
    const { articles } = data;
    if (!Array.isArray(articles) || articles.length === 0) {
        newsContainer.innerHTML = '<p>找不到相關新聞。</p>';
        pageNav.innerHTML = '';
        return;
    }

    newsContainer.innerHTML = articles.map(art => `
        <div class="news-card">
            <img src="${art.urlToImage || 'https://via.placeholder.com/200x150'}" alt="news">
            <div class="news-content">
                <h3>${art.title}</h3>
                <p>${art.description || '點擊閱讀更多內容...'}</p>
                <a href="${art.url}" target="_blank">Read More →</a>
                <div class="news-meta"> ↪︎ Published at: ${formatDate(art.publishedAt)}</div>
            </div>
        </div>
    `).join('');

    renderPageNav();
}

function renderPageNav() {
    const totalPages = Math.ceil(totalResults / PAGE_SIZE);
    if (totalPages <= 1) {
        pageNav.innerHTML = '';
        return;
    }

    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<span class="page-num ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</span>`;
    }
    pageNav.innerHTML = html;

    pageNav.querySelectorAll('.page-num').forEach(el => {
        el.addEventListener('click', () => {
            const page = parseInt(el.dataset.page);
            if (page === currentPage) return;
            currentPage = page;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            fetchNews(currentKeyword);
        });
    });
}

fetchNews();

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});
