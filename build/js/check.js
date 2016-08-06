'use strict';

function getMessage(a, b) {

  var result;

  /**
   * Вспомогательная функция
   */

  function sumArray(arr1, arr2) {

    var arrTrue1 = Array.isArray(arr1),
        arrTrue2 = Array.isArray(arr2);

    var allSum = 0;

    if (arrTrue1 && arrTrue2) {

      for (var i = 0; i < arr1.length; i++) {

        for (var j = 0; j < arr2.length; j++) {
          if (i === j) {
            allSum += arr1[i] * arr2[j];
          };
        };
      };
    }else if (arrTrue1) {

      for (i = 0; i < arr1.length; i++) {
        allSum += arr1[i];
      };
    }else {
      alert('Не было передано ни одного массива!');
      return;
    };

    return allSum;
  };

  // Определяем тип изображения

  if (typeof a === 'boolean' && b !== undefined) {
    result = 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
  }else {
    result = 'Переданное GIF-изображение не анимировано';
  };

  if (typeof a === 'number') {
    result = 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + (b * 4) + ' атрибутов';
  };

  if (Array.isArray(a)) {
    var amountOfRedPoints = sumArray(a);

    result = 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  };

  if (Array.isArray(a) && Array.isArray(b)) {
    var artifactsSquare = sumArray(a, b);

    result = 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  };

  return result;
};
