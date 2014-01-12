var matcher = /\/archive\/index.php\/t-/;
var token = "#redirecting";

var is_vBulletin = function() {
  return document.body.innerText.indexOf('vBulletin') !== -1;
};

var getPageNumber = function(url) {
  var matches = url.match(/p-([0-9]+)+\.html$/)
  if (matches) {
    return matches[matches.length-1];
  }
};

if (is_vBulletin() && matcher.test(window.location.href) && window.location.href.indexOf(token) === -1) {
  var url = window.location.href
    .replace(matcher, '/showthread.php?t=')
    .replace(/\.html/, '')
    .replace(/-p-[0-9]+/, '');
  var pageNumber = getPageNumber(window.location.href);
  if (pageNumber) {
    url += '/page' + pageNumber;
  }

  window.location.href = token;
  chrome.extension.sendRequest({ redirect: url });
}
