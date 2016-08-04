'use strict';

function getMessage(a, b) {

  var resultat;

  if (typeof a === 'boolean' && b !== undefined) {
    resultat = 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
  }else {
    resultat = 'Переданное GIF-изображение не анимировано';
  };

  if (typeof a === 'number') {
    resultat = 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + (b * 4) + ' атрибутов';
  };

  if (Array.isArray(a)) {
    var amountOfRedPoints = sumArray(a);

    resultat = 'Количество красных точек во всех строчках изображения: ' + amountOfRedPoints;
  };

  if (Array.isArray(a) && Array.isArray(b)) {
    var artifactsSquare = sumArray(a, b);

    resultat = 'Общая площадь артефактов сжатия: ' + artifactsSquare + ' пикселей';
  };

  return resultat;
};

// Вспомогательная функция

function sumArray(arr1, arr2) {

  var arrTrue1 = Array.isArray(arr1),
      arrTrue2 = Array.isArray(arr2);

  var sumArr1  = 0,
      sumArr2  = 0,
      allSum;

  if (!arrTrue1 && !arrTrue2) {
    alert('Не было передано ни одного массива!');

    return;
  };

  if (arrTrue1) {
    for (var i = 0; i < arr1.length; i++) {
      sumArr1 += arr1[i];
    };
  };

  if (arrTrue2) {
    for (i = 0; i < arr2.length; i++) {
      sumArr2 += arr2[i];
    };
  };

  return allSum = sumArr1 + sumArr2;
};
