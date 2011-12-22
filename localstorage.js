
// Source: https://developer.mozilla.org/en/DOM/Storage
// Notes: Storage objects are a recent addition to the standard; as such they may not be present in all browsers. 
// You can work around this by inserting the following two codes at the beginning of your scripts, allowing use 
// of localStorage object in implementations which do not natively support it.
// This is a less exact imitation of the localStorage object. It is simpler, but it is compatible with old browsers, 
// like Internet Explorer < 8. It also makes use of cookies.

var tweeeeeeeeeet = (tweeeeeeeeeet === null || typeof tweeeeeeeeeet === 'undefined') ? {} : tweeeeeeeeeet;

if (!window.localStorage) {
  tweeeeeeeeeet.localStorage = {
    getItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
      return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
    },
    key: function (nKeyId) { return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]); },
    setItem: function (sKey, sValue) {
      if(!sKey) { return; }
      document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
      this.length = document.cookie.match(/\=/g).length;
    },
    length: 0,
    removeItem: function (sKey) {
      if (!sKey || !this.hasOwnProperty(sKey)) { return; }
      var sExpDate = new Date();
      sExpDate.setDate(sExpDate.getDate() - 1);
      document.cookie = escape(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";
      this.length--;
    },
    hasOwnProperty: function (sKey) { return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie); }
  };
  tweeeeeeeeeet.localStorage.length = (document.cookie.match(/\=/g) || tweeeeeeeeeet.localStorage).length;
} else {
  tweeeeeeeeeet.localStorage = window.localStorage;
}
