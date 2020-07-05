"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// função que cria os elementos e obtém a referência do container que se aplica o height máximo
var getElementsHTML = function getElementsHTML() {
  var MAX_HEIGHT_WRAPPER = document.querySelector('.main');
  var createStyleBar = document.createElement('span');
  var createContainerStyleBar = document.createElement('div');
  return [MAX_HEIGHT_WRAPPER, createStyleBar, createContainerStyleBar];
}; // adiciona estilos ao elemento bar e adiciona ele e o seu container no corpo do body


var createIncrementStyleBar = function createIncrementStyleBar(contextStyleBar, containerStyleBar) {
  var styles = ["height: 4px;\n    background-color: rgb(102, 51, 204);\n    position: fixed;\n    top: 0px;\n    left: 0px;\n    transition: all 0.5s ease-out 0s;\n    width: 0;"];
  contextStyleBar.style = styles;
  document.body.appendChild(containerStyleBar);
  containerStyleBar.appendChild(contextStyleBar);
  return contextStyleBar;
}; // atualiza a porcentagem de largura da barra de status


var updateContextHeightStyleBar = function updateContextHeightStyleBar(styleBarElement, MAX_HEIGHT_WRAPPER) {
  var MAX_HEIGHT_CONTEXT = MAX_HEIGHT_WRAPPER.offsetHeight;
  var getPositionYOffScroll = window.pageYOffset;
  var updateStyleBarElementWidth = Math.ceil(getPositionYOffScroll * 110 / MAX_HEIGHT_CONTEXT);
  window.localStorage.setItem('widthStyleBar', updateStyleBarElementWidth);
  if (updateStyleBarElementWidth === 100) return;
  return styleBarElement.style.width = "".concat(updateStyleBarElementWidth, "%");
}; // pega o corpo dos elementos do body, do container e da style bar


var _getElementsHTML = getElementsHTML(),
    _getElementsHTML2 = _slicedToArray(_getElementsHTML, 3),
    MAX_HEIGHT_WRAPPER = _getElementsHTML2[0],
    createStyleBar = _getElementsHTML2[1],
    containerStyleBar = _getElementsHTML2[2]; // passa o elemento de bar e o container e retorna o elemento já encorporado ao html


var styleBarElement = createIncrementStyleBar(createStyleBar, containerStyleBar); // Escuta o scroll da página

var handleListnerEvent = function handleListnerEvent() {
  return document.addEventListener('scroll', function () {
    return updateContextHeightStyleBar(styleBarElement, MAX_HEIGHT_WRAPPER);
  });
}; // pega o width da style bar no localStorage


var getLocalStorageWidth = function getLocalStorageWidth() {
  return window.localStorage.getItem('widthStyleBar');
}; // interval animation de 0 até o width salvo no localStorage


var animationStatusBar = function animationStatusBar(current, hasWidthStyleBar, interval) {
  styleBarElement.style.width = "".concat(current, "%");

  if (current === Number(hasWidthStyleBar)) {
    clearInterval(interval);
  }
}; // verifica se existe um estado de width salvo no localStorage e aplica quando atualizar a página.


function isWidthState() {
  var hasWidthStyleBar = getLocalStorageWidth();
  var current = 0;

  if (hasWidthStyleBar) {
    var interval = setInterval(function () {
      return animationStatusBar(current++, hasWidthStyleBar, interval);
    }, 0.1);
    return handleListnerEvent();
  }

  return handleListnerEvent();
}

isWidthState();
/*
* element.offsetHeight => get MAX_SIZE of height container
* window.pageYOffset => get current scroll position
*/