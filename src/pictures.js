'use strict';

(function() {
  var pictures = [];
  var callbackName = 'jsonpCallback';
  var url = 'http://localhost:1506/api/pictures?callback=' + callbackName;

  var savePictures = function(data) {
    pictures = data;
    console.log(pictures);
  };

  function getJSONP(src, callback) {
    window[callbackName] = callback;
    // Добавляем на страницу динамически созданный тег 'script'
    // с внешней ссылкой.
    var scriptEl = document.createElement('script');
    scriptEl.src = src;
    document.body.appendChild(scriptEl);
  }

  getJSONP(url, savePictures);
})();
