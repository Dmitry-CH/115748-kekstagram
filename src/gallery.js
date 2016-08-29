'use strict';

/**
  * Конструктор объектов 'Gallery'.
  */
var Gallery = function() {
  this.pictures = [];
  this.activePicture = 0;

  this.picturesLength = 0;

  // Ссылки на DOM-элементы.
  this.galleryContainer = document.querySelector('.gallery-overlay');
  this.galleryClose = document.querySelector('.gallery-overlay-close');
  this.galleryImage = document.querySelector('.gallery-overlay-image');
};

/**
  * Общие методы всех объектов 'Gallery'.
  */
Gallery.prototype.setPictures = function(arrPictures) {
  this.pictures = arrPictures;

  // Записываем в 'picturesLength' длину полученного массива.
  this.picturesLength = arrPictures.length;
};

Gallery.prototype.show = function(number) {
  // Сохраняем в переменную ссылку на текущий объект.
  var self = this;

  // Добовляем обработчики событий.
  // Клик по 'Х', закрытие 'Gallery'.
  this.galleryClose.onclick = function() {
    self.hide();
  };

  // Клик по большому изображению, следующее изображение.
  this.galleryImage.onclick = function() {

    if (self.activePicture < self.picturesLength - 1) {
      self.setActivePicture(self.activePicture + 1);
    }else {
      self.setActivePicture(0);
    }
  };

  this.galleryContainer.classList.remove('invisible');
  this.setActivePicture(number);
};

Gallery.prototype.hide = function() {
  this.galleryContainer.classList.add('invisible');

  // Удаляем обработчики событий.
  this.galleryClose.onclick = null;
  this.galleryImage.onclick = null;
};

Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = +number;

  this.galleryImage.src = this.pictures[this.activePicture].url;

  // Записывает в DOM-элементы количество лайков и комментариев для показанной фотографии.
  this.galleryContainer.querySelector('.likes-count').innerHTML = this.pictures[this.activePicture].likes;
  this.galleryContainer.querySelector('.comments-count').innerHTML = this.pictures[this.activePicture].comments;
};

module.exports = new Gallery();
