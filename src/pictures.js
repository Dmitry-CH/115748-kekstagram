'use strict';

(function() {
  var pictures = [];
  var callbackName = 'jsonpCallback';
  var url = 'http://localhost:1506/api/pictures?callback=' + callbackName;

  // Получаю элемент контейнер, куда буду помещать новые элементы.
  var picturesContainer = document.querySelector('.pictures');
  // Получаю элемент шаблон 'template'.
  var templateElement = document.querySelector('#picture-template');
  // Переменная куда помещаю нужный элемент из шаблона.
  var elementToClone;

  // Условие проверки.
  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.picture');
  }else {
    elementToClone = templateElement.querySelector('.picture');
  }

  /**
   *
   */

  function getPictureElement(data, container) {
    var element = elementToClone.cloneNode(true);
    var pictureStats = element.querySelector('.picture-stats');

    var newImg = new Image(182, 182);

    newImg.onload = function() {
      element.insertBefore(newImg, pictureStats);

      var allImg = element.querySelectorAll('img');
      element.removeChild(allImg[0]);
    };

    newImg.onerror = function() {
      element.classList.add('picture-load-failure');
    };

    newImg.src = data.url;

    element.querySelector('.picture-comments').textContent = data.comments;
    element.querySelector('.picture-likes').textContent = data.likes;
    container.appendChild(element);

    return element;
  }

  /**
   *
   */

  var renderPictures = function(data) {
    var filtersElement = document.querySelector('.filters');
    // Прячем блок filters, добавляя класс 'hidden'.
    filtersElement.classList.add('hidden');

    // Сохраняем полученный список изображений в переменную.
    pictures = data;

    // Перебираем список изображений и применяем шаблон.
    pictures.forEach(function(img) {
      getPictureElement(img, picturesContainer);
    });
  };

  /**
   *
   */

  function getJSONP(src, callback) {
    window[callbackName] = callback;
    // Добавляем на страницу динамически созданный тег 'script'
    // с внешней ссылкой.
    var scriptEl = document.createElement('script');
    scriptEl.src = src;
    document.body.appendChild(scriptEl);
  }

  // Выполняем JSONP запрос на сервер.
  getJSONP(url, renderPictures);
})();
