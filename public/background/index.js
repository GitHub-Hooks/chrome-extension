chrome.runtime.onInstalled.addListener(function(details){
  chrome.storage.sync.get({
    token: null,
  }, function({ token }) {
    if (!token) {
      const clientId = 'd244c146ec260d1966f7';
      const redirectUri = 'https://github-ui-hooks.now.sh';

      chrome.tabs.create({
        url: `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`
      })
    }
  });
});
