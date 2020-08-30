function getAll (key) {
    var val = getCookie(key);
    return val ? JSON.parse(val) : [];
};

var getCookie = function getCookie(cookieName) {
    var documentCookie = document.cookie;
    if (documentCookie.length > 0) {
        var start = documentCookie.indexOf(cookieName + "=");
        if (start != -1) {
            start = start + cookieName.length + 1;
            var end = documentCookie.indexOf(";", start);
            if (end == -1) {
                end = documentCookie.length;
            }
            return unescape(documentCookie.substring(start, end));
        }
    }
    return null;
};
var bookmarks = getAll('bookmarks');
console.log(bookmarks);

