'use strict';

(function() {
  var pictures = [];
  var callbackName = 'jsonpCallback';

  // Ссылка на загрузку внешних данных.
  var url = 'http://localhost:1506/api/pictures?callback=' + callbackName;

  // Получаем элемент контейнер, куда будем помещать сгенерированные элементы.
  var picturesContainer = document.querySelector('.pictures');
  // Получаем элемент 'template'.
  var templateElement = document.querySelector('#picture-template');
  // Переменная куда помещаем нужный элемент из шаблона.
  var sampleElement;

  var IMAGE_LOAD_TIMEOUT = 10000;

  // Хак для 'template'.
  if ('content' in templateElement) {
    sampleElement = templateElement.content.querySelector('.picture');
  }else {
    sampleElement = templateElement.querySelector('.picture');
  }

  /**
   * Скрывает/показывает блок 'filters'.
   * @param {boolean} show
   */

  function toggleShowElement(show) {
    var filtersElement = document.querySelector('.filters');

    if (show) {
      filtersElement.classList.remove('hidden');
    }else {
      filtersElement.classList.add('hidden');
    }
  }

  /**
   * Создает из шаблона новый элемент 'img'.
   * @param {object} data
   * @param {element} container
   */

  function getPictureElement(data, container) {
    // Клонируем элемент шаблона.
    var element = sampleElement.cloneNode(true);

    // Создаем новое изображение через конструктор.
    var contentIMG = new Image(182, 182);

    // Обработчик загрузки изображения.
    contentIMG.onload = function() {
      clearTimeout(imgLoadTimeout);

      // Заменяем текущий 'img' на новый из конструктора.
      element.replaceChild(contentIMG, element.querySelector('img'));
    };

    // Обработчик ошибки сервера.
    contentIMG.onerror = function() {
      element.classList.add('picture-load-failure');
    };

    contentIMG.src = data.url;

    // Обработчик длительного ожидания ответа от сервера.
    var imgLoadTimeout = setTimeout(function() {
      contentIMG.src = '';

      element.classList.add('picture-load-failure');
    }, IMAGE_LOAD_TIMEOUT);

    element.querySelector('.picture-comments').textContent = data.comments;
    element.querySelector('.picture-likes').textContent = data.likes;
    container.appendChild(element);
  }

  /**
   * Выполняет обработку JSONP запросов.
   * @param {string} url
   * @param {function} callback
   */

  function getJSONP(src, callback) {
    // Скрываем блок 'filters'.
    toggleShowElement(false);

    window[callbackName] = callback;

    // Добавляем на страницу динамически созданный тег 'script'
    // с внешней ссылкой.
    var scriptEl = document.createElement('script');
    scriptEl.src = src;
    document.body.appendChild(scriptEl);
  }

  /**
   * Обрабатывает полученные данные с сервера.
   * @param {array} data
   */

  var renderPictures = function(data) {
    // Сохраняем полученный список изображений в переменную.
    pictures = data;

    // Перебираем список изображений и применяем шаблон.
    pictures.forEach(function(img) {
      getPictureElement(img, picturesContainer);
    });

    // Показываем блок 'filters'.
    toggleShowElement(true);
  };

  // Выполняем JSONP запрос на сервер.
  getJSONP(url, renderPictures);
})();
