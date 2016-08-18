'use strict';

(function() {
  var url = 'http://localhost:1506/api/pictures?callback=jsonpCallback';

  function picturesList(list) {
    var pictures = [];

    pictures = list;
    console.log(pictures);
  }

  function loadPictures(src, callback) {
    // Функция обработки JSONP.
    var jsonpCallback = function(data) {
      return data;
    };

    // Добавляем на страницу динамически созданный тег 'script'
    // с внешней ссылкой.
    var scriptEl = document.createElement('script');
    scriptEl.src = src;
    document.body.appendChild(scriptEl);

    // Вызываем функцию, которая выводит в консоль полученные данные.
    callback(jsonpCallback());
  }

  loadPictures(url, picturesList);
})();
