'use strict';

module.exports = function(list, filterID) {
  switch (filterID) {
    case 'popular':
      list.sort(function(a, b) {
        return b.likes - a.likes;
      });
      break;

    case 'new':
      list.sort(function(a, b) {
        return b.created - a.created;
      });
      break;

    case 'discussed':
      list.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;

    default:
      list.sort(function(a, b) {
        return b.likes - a.likes;
      });
  }

  return list;
};
