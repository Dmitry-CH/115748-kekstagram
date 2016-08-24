'use strict';

/**
 * toggleShowElement
 * Скрывает/показывает блок 'filters'.
 * @param {boolean} show
*/

/**
 * checkedForTemplate
 * Возвращает элемент из шаблона.
 * @return {HTMLElement}
*/

module.exports = {
  toggleShowElement: function(show) {
    var filtersElement = document.querySelector('.filters');

    if (show) {
      filtersElement.classList.remove('hidden');
    }else {
      filtersElement.classList.add('hidden');
    }
  },
  checkedForTemplate: function() {
    // Получаем элемент 'template'.
    var templateElement = document.querySelector('#picture-template');
    var elementContent;

    // Хак для 'template'.
    if ('content' in templateElement) {
      elementContent = templateElement.content.querySelector('.picture');
    }else {
      elementContent = templateElement.querySelector('.picture');
    }

    return elementContent;
  }
};
