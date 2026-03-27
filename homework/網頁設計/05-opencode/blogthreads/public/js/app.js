function toggleLike(btn) {
  btn.classList.toggle('liked');
  const countSpan = btn.querySelector('.like-count');
  let count = parseInt(countSpan.textContent) || 0;
  
  if (btn.classList.contains('liked')) {
    count++;
    btn.style.color = '#FD1D1D';
  } else {
    count--;
    btn.style.color = '';
  }
  
  countSpan.textContent = count;
}

function sharePost(postId) {
  const url = window.location.origin + '/post/' + postId;
  
  if (navigator.share) {
    navigator.share({
      title: 'Check out this post',
      url: url
    }).catch(() => {
      copyToClipboard(url);
    });
  } else {
    copyToClipboard(url);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Link copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy link');
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}
