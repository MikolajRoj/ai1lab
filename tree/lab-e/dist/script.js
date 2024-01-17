/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


var msg = "Hello!";
alert(msg);
function changeStyle(styleName) {
  var link = document.getElementById('dynamic-style');
  if (link) {
    link.href = "styles/".concat(styleName, ".css");
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var buttons = {
    'style-respon': 'style_respon',
    'style-other': 'style_other',
    'style-1': 'style_1',
    'style-2': 'style_2',
    'style-3': 'style_3'
  };
  Object.keys(buttons).forEach(function (buttonId) {
    var button = document.getElementById(buttonId);
    button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
      return changeStyle(buttons[buttonId]);
    });
  });
});
/******/ })()
;