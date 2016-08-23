'use strict';

/**
 * Создает из шаблона новый элемент 'img'.
 * @param {object} data
 * @param {element} container
 */

module.exports = function(data, container) {
  // Подключение внешних модулей.
  var utility = require('./utility');

  // Переменная куда помещаем нужный элемент из шаблона.
  // Вызов из внешнего модуля 'utility'.
  var sampleElement = utility.checkedForTemplate();

  /**
   * Задержка таймера.
   * @const
   */
  var IMAGE_LOAD_TIMEOUT = 10000;

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
};