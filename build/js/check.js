'use strict';

function getMessage(a, b) {

  var result;

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

  //
  // Вспомогательная функция

  function sumArray(arr1, arr2) {

    var arrTrue1 = Array.isArray(arr1),
        arrTrue2 = Array.isArray(arr2);

    var sumArr1  = 0,
        sumArr2  = 0,
        allSum;

    if (arrTrue1) {
      for (var i = 0; i < arr1.length; i++) {
        sumArr1 += arr1[i];
      };

      if (arrTrue2) {
        for (i = 0; i < arr2.length; i++) {
          sumArr2 += arr2[i];
        };
      };
    }else {
      alert('Не было передано ни одного массива!');
      return;
    };

    return allSum = sumArr1 + sumArr2;
  };
};
