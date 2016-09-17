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
  /**
   * Добовляем обработчики событий.
   */

  // Обработчик адресной строки, запускает метод setActivePicture.
  window.addEventListener('hashchange', this.setActivePicture(number));

  // Клик по 'Х', закрытие 'Gallery'.
  var onGalleryClose = function() {
    this.hide();
  };

  this.galleryClose.onclick = onGalleryClose.bind(this);

  // Клик по большому изображению, следующее изображение.
  var onGalleryImage = function() {

    if (this.activePicture < this.picturesLength - 1) {
      this.setActivePicture(this.activePicture + 1);
    }else {
      this.setActivePicture(0);
    }
  };

  this.galleryImage.onclick = onGalleryImage.bind(this);

  this.galleryContainer.classList.remove('invisible');
};

Gallery.prototype.hide = function() {
  this.galleryContainer.classList.add('invisible');

  location.hash = '';

  // Удаляем обработчики событий.
  this.galleryClose.onclick = null;
  this.galleryImage.onclick = null;
};

Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = parseFloat(number);

  this.galleryImage.src = this.pictures[this.activePicture].url;

  // Записывает в DOM-элементы количество лайков и комментариев для показанной фотографии.
  this.galleryContainer.querySelector('.likes-count').innerHTML = this.pictures[this.activePicture].likes;
  this.galleryContainer.querySelector('.comments-count').innerHTML = this.pictures[this.activePicture].comments;
};

module.exports = new Gallery();
