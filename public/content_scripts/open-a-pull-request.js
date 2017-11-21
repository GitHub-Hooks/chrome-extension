chrome.storage.sync.get({
  token: null,
}, function({ token }) {
  const owner = window.location.href.split('/')[3];
  const repo = window.location.href.split('/')[4];
  let branch = window.location.href.split('compare/')[1].split('?')[0];

  if (window.location.href.includes('...')) {
    branch = window.location.href.split('...')[1].split('?')[0]
  }

  fetch(`https://api.github.com/repos/${owner}/${repo}/contents/.github-ui-hooks.js?ref=${branch}&access_token=${token}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw(response);
    }
  })
  .then((meta) => {
    const payload = window.atob(meta.content);
    const script = document.createElement('script');
    script.innerHTML = `
      ${payload}
      hooks['open-a-pull-request']({branch: ${JSON.stringify(branch)}});
    `;
    document.head.appendChild(script);
  })
  .catch(() => {
    // no-op
  });
});
