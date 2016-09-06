'use strict';

// Подключение внешних модулей.
var gallery = require('./gallery');
var utility = require('./utility');

/**
  * Создает из шаблона DOM-элемент.
  * @return {HTMLElement}
  */

function createElement(obj) {
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

  contentIMG.src = obj.url;

  // Обработчик длительного ожидания ответа от сервера.
  var imgLoadTimeout = setTimeout(function() {
    contentIMG.src = '';

    element.classList.add('picture-load-failure');
  }, IMAGE_LOAD_TIMEOUT);

  element.querySelector('.picture-comments').textContent = obj.comments;
  element.querySelector('.picture-likes').textContent = obj.likes;

  return element;
}

/**
  * Конструктор объектов 'Picture'.
  * @param {object} data
  */

var Picture = function(data) {
  this.data = data;
  this.element = createElement(data);

  // Добовляем на изображение обработчик клика.
  this.element.onclick = function(evt) {
    evt.preventDefault();
    gallery.show(evt.target.parentElement.dataset.indeximg);
  };

  // Удаляет обработчики событий.
  this.remove = function() {
    this.element.onclick = null;
  };
};

// Экспортирую из модуля конструктор.
module.exports = Picture;
