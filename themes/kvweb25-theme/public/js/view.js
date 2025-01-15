/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/scripts/accordion.js":
/*!****************************************!*\
  !*** ./resources/scripts/accordion.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Accordion)
/* harmony export */ });
class Accordion {
  /**
   * @param {HTMLDetailsElement} el
   */
  constructor(el) {
    this.el = el;
    this.summary = /** @type {HTMLElement} */el.querySelector('summary');
    this.content = /** @type {HTMLElement} */el.querySelector(':scope > *:not(summary)');
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    const listener = this.onClick.bind(this);
    this.summary.addEventListener('click', listener);
  }
  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }
  shrink() {
    this.isClosing = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    if (this.animation) {
      this.animation.cancel();
    }
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }
  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }
  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    if (this.animation) {
      this.animation.cancel();
    }
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }
  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./resources/view.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/accordion */ "./resources/scripts/accordion.js");


/** @type {number} lastScrollPosition */
let lastScrollPosition = 0;
/** @type {number} newScrollPosition */
let newScrollPosition = 0;
let ticking = false;
function doSomething(scrollPos) {
  document.body.classList.toggle('body-scrolled', scrollPos > 0);
  if (scrollPos < lastScrollPosition - 8 && scrollPos >= 170) {
    document.body.classList.add('scrolled-up');
  } else if (scrollPos < 170 || scrollPos > lastScrollPosition) {
    document.body.classList.remove('scrolled-up');
  }
  lastScrollPosition = scrollPos;
}
document.addEventListener('scroll', () => {
  newScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      doSomething(newScrollPosition);
      ticking = false;
    });
    ticking = true;
  }
}, {
  passive: true
});
document.addEventListener('DOMContentLoaded', () => {
  /** @type { HTMLTemplateElement | null } */
  const template = document.querySelector('#svg-template');
  if (!template) return;
  const paragraphsWithLinkIcon = document.querySelectorAll('.eee-icon');
  paragraphsWithLinkIcon.forEach(paragraph => {
    const result = paragraph.className.match(/eee-icon-(\S*)/);
    const iconName = result && result[1] ? result[1] : 'arrow-long-right';
    const templateClone = /** @type { HTMLElement } */template.content.cloneNode(true);
    const use = /** @type { SVGUseElement } */templateClone.querySelector('use');
    use.setAttribute('href', '#' + iconName);
    paragraph.querySelectorAll('a').forEach(link => link.append(templateClone));
  });
  requestAnimationFrame(() => {
    document.querySelectorAll('.wp-block-details').forEach(el => {
      new _scripts_accordion__WEBPACK_IMPORTED_MODULE_0__["default"](/** @type {HTMLDetailsElement} */el);
    });
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map