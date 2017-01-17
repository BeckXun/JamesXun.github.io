'use strict';

window.onresize = function () {
  var rem = document.documentElement.clientWidth / 375 * 100;
  document.documentElement.style.fontSize = rem + 'px';
};
window.onresize();