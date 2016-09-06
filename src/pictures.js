'use strict';

// Подключение внешних модулей.
var gallery = require('./gallery');
var load = require('./load');
var Picture = require('./picture');
var utility = require('./utility');

// Получаем элемент контейнер, filters.
var filters = document.querySelector('.filters');

// Получаем элемент контейнер, куда будем помещать сгенерированные элементы.
var picturesContainer = document.querySelector('.pictures');

// Получаем элемент, footer.
var footer = document.querySelector('footer');
var footerHeight = footer.offsetHeight;

var pictures = [];

// Задаем базовые настройки отображения списка изображений
// для GET запроса.
var pageNumber = 0;
var pageSize = 12;
var filterId = 'popular';

/**
 * Выполняет добавление индекса изображению.
*/

function addIndexPicture() {
  var allPicture = picturesContainer.querySelectorAll('.picture');

  allPicture.forEach(function(elm, i) {
    elm.dataset.indeximg = i;
  });
}

/**
 * Проверяет виден ли footer, если да, то загружает следующую страницу.
*/

function watchFooter() {
  if (footer.getBoundingClientRect().bottom - window.innerHeight <= footerHeight) {
    pageNumber += 1;
    loadPictures(filterId, pageNumber, pageSize);
  }
}

/**
 * Вызывает загрузку изображений.
 * @param {string} filter
 * @param {number} currentPageNumber
*/

var loadPictures = function(filter, currentPageNumber, currentpageSize) {
  // Ссылка на загрузку внешних данных.
  var url = 'http://localhost:1506/api/pictures';

  // Параметры GET запроса.
  var optionList = {
    from: currentPageNumber * currentpageSize,
    to: (currentPageNumber * currentpageSize) + currentpageSize,
    filter: filter
  };

  // Выполняем XMLHttpRequest запрос на сервер.
  load(url, optionList, renderPictures);
};

/**
 * Обрабатывает полученные данные с сервера.
 * @param {array} data
*/

var renderPictures = function(data) {
  // Скрываем блок 'filters'.
  utility.toggleShowElement(false);

  // Сохраняем полученный список изображений в переменную.
  pictures = data;
  console.log(pictures);

  // Перебираем список изображений и применяем шаблон.
  pictures.forEach(function(img) {
    var elementIMG = new Picture(img);

    // Добавляем на страницу новый созданный элемент.
    picturesContainer.appendChild(elementIMG.element);

    // Выполняем добавление индекса изображению.
    addIndexPicture();
  });

  // Передаем массив изображений.
  gallery.setPictures(pictures);

  // Показываем блок 'filters'.
  utility.toggleShowElement(true);
};

/**
 * Перерисовывает страницу с изображениями
 * в зависимости от выбранного фильтра.
*/

var reloadPictures = function() {
  // Получаем список элементов в контейнере picturesContainer.
  var allPicture = picturesContainer.querySelectorAll('.picture');
  var lengthAllPicture = allPicture.length;

  // Удаляем все элементы из контейнера picturesContainer.
  for (var i = 0; i < lengthAllPicture; i++) {
    picturesContainer.removeChild(allPicture[i]);
  }

  // Обнуляем номер текущей страницы.
  pageNumber = 0;

  // Выполняем XMLHttpRequest запрос на сервер.
  loadPictures(filterId, pageNumber, pageSize);

  watchFooter();
};

/**
 * Обработчик события onload, загрузки страницы целиком.
*/

window.addEventListener('load', watchFooter);

/**
 * Обработчик события scroll, загрузка новых страниц.
*/

// Запоминаем текущее время, в мс.
var lastCall = Date.now();

window.addEventListener('scroll', function() {
  if (Date.now() - lastCall >= 160) {
    watchFooter();

    // Обновляем текущее время, в мс.
    lastCall = Date.now();
  }
});

/**
 * Обработчик события change, выбор фильтра сортировки.
*/

filters.addEventListener('change', function(evt) {
  filterId = evt.target.value;

  reloadPictures();
}, true);

loadPictures(filterId, pageNumber, pageSize);
