'use strict';

/**
 * Выполняет обработку JSONP запросов.
 * @param {string} src
 * @param {function} callback
 * @param {string} callbackName
 */

module.exports = function(src, callback, callbackName) {
  window[callbackName] = callback;

  // Добавляем на страницу динамически созданный тег 'script'
  // с внешней ссылкой.
  var scriptEl = document.createElement('script');
  scriptEl.src = src;
  document.body.appendChild(scriptEl);
};
