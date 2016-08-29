'use strict';

// Подключение внешних модулей.
var gallery = require('./gallery');
var load = require('./load');
var picture = require('./picture');
var utility = require('./utility');

var pictures = [];
var nameCallback = 'jsonpCallback';

// Ссылка на загрузку внешних данных.
var url = 'http://localhost:1506/api/pictures';

// Получаем элемент контейнер, куда будем помещать сгенерированные элементы.
var picturesContainer = document.querySelector('.pictures');

/**
 * Обрабатывает полученные данные с сервера.
 * @param {array} data
*/

var renderPictures = function(data) {
  // Скрываем блок 'filters'.
  utility.toggleShowElement(false);

  // Сохраняем полученный список изображений в переменную.
  pictures = data;

  // Перебираем список изображений и применяем шаблон.
  pictures.forEach(function(img, i) {
    picture(img, picturesContainer, i);
  });

  // Передаем массив изображений.
  gallery.setPictures(pictures);

  // Показываем блок 'filters'.
  utility.toggleShowElement(true);
};

// Выполняем JSONP запрос на сервер.
load(url, renderPictures, nameCallback);
