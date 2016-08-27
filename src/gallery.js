'use strict';

// Конструктор объектов 'Gallery'.
var Gallery = function() {
  var self = this;

  this.pictures = [];
  this.activePicture = 0;

  // Ссылки на DOM-элементы.
  this.galleryContainer = document.querySelector('.gallery-overlay');
  this.galleryClose = document.querySelector('.gallery-overlay-close');
  this.galleryImage = document.querySelector('.gallery-overlay-image');

  // Обработчики событий.
  this.galleryClose.onclick = function() {
    self.hide();
  };
};

/** Общие методы всех объектов 'Gallery' */
Gallery.prototype.setPictures = function(arrPictures) {
  this.pictures = arrPictures;
};

Gallery.prototype.show = function(number) {
  this.setActivePicture(number);
};

Gallery.prototype.hide = function() {
  this.galleryContainer.classList.add('invisible');
  this.galleryClose.onclick = null;
};

Gallery.prototype.setActivePicture = function(number) {
  this.activePicture = number;

  //
  this.galleryImage.src = this.pictures[number].url;
};

module.exports = new Gallery();
