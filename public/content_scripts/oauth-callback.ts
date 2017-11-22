function removeHash () {
  // https://stackoverflow.com/a/5298684
  var scrollV, scrollH, loc = window.location;
  if ('pushState' in history)
    history.pushState("", document.title, loc.pathname + loc.search);
  else {
    // Prevent scrolling by storing the page's current scroll offset
    scrollV = document.body.scrollTop;
    scrollH = document.body.scrollLeft;

    loc.hash = '';

    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scrollV;
    document.body.scrollLeft = scrollH;
  }
}

chrome.storage.sync.get({
  token: null,
}, function({ token }) {
  if (!token) {
    const token = window.location.hash.split('#')[1];
    if (token && token.length === 40) {
      chrome.storage.sync.set({
        token
      }, function() {
        removeHash();
        window.alert('GitHub UI Hooks has successfully authenticated');
      });
    }
  }
});
