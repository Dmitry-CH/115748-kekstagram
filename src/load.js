'use strict';

/**
 * Выполняет обработку XMLHttpRequest запросов.
 * @param {string} url
 * @param {object} params
 * @param {function} callback
 */

module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();

  // Задаем параметры запроса.
  xhr.open('GET', url +
    '?from=' + (params.from || 0) +
    '&to=' + (params.to || 12) +
    '&filter=' + (params.filter || 'popular')
  );

  // Обработчик успешного выполнения запроса к серверу.
  xhr.onload = function(evt) {
    var loadedData = evt.target.response;
    loadedData = JSON.parse(loadedData);

    callback(loadedData);
  };

  // Отсылаем запрос на сервер.
  xhr.send();
};
