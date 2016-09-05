'use strict';

// Подключение внешних модулей.
var gallery = require('./gallery');
var load = require('./load');
var Picture = require('./picture');
var utility = require('./utility');

var filters = document.querySelector('.filters');

var pictures = [];

// Задаем базовые настройки отображения списка изображений.
var currentPageNumber = 0;
var pageSize = 12;

// Ссылка на загрузку внешних данных.
var url = 'http://localhost:1506/api/pictures';

// Параметры GET запроса.
var optionList = {
  from: currentPageNumber,
  to: pageSize,
  filter: 'popular'
};

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
    var elementIMG = new Picture(img, i);

    // Добавляем на страницу новый созданный элемент.
    picturesContainer.appendChild(elementIMG.element);
  });

  // Передаем массив изображений.
  gallery.setPictures(pictures);

  // Показываем блок 'filters'.
  utility.toggleShowElement(true);
};

// Выполняем XMLHttpRequest запрос на сервер.
load(url, optionList, renderPictures);

/**
 * Обработчик фильтра.
 * @param {array} data
*/

console.log(filters);
