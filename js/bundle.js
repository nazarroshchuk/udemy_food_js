/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function calc() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'famile';
        localStorage.setItem('sex', 'famile');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.classList.remove(activeClass);
            
            if(el.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                el.classList.add(activeClass);
            } 
            if(el.getAttribute('id') === localStorage.getItem('sex')) {
                el.classList.add(activeClass);
            }  
        });
    }
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    initLocalSettings('#gender div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '0';
            return;   
        } 
        if (sex === 'mail') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 *age)) * ratio);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }
    calcTotal();

    function getStatisticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    

    elements.forEach((el) => {

            el.addEventListener('click', (e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(el => {
                    el.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
            
    });
    }

    function getDynamicInfo(parentSelector) {
        const inputs = document.querySelectorAll(`${parentSelector} input`);
        inputs.forEach(inp => {
            inp.addEventListener('input', (e)=> {

                if(inp.value.match(/\D/g)) {
                    inp.style.border = '1px solid red';
                } else {
                    inp.style.border = 'none';
                }

                switch (inp.getAttribute('id')) {
                    case 'weight':
                        weight = parseInt(inp.value);
                        break;
                    case 'age':
                        age = parseInt(inp.value);
                        break;
                    case 'height':
                        height = parseInt(inp.value);
                        break;
                }
                calcTotal();
            });
        });
    }
    getDynamicInfo('.calculating__choose.calculating__choose_medium');
    getStatisticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    getStatisticInformation('#gender div', 'calculating__choose-item_active');
}

/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class MenuCard {
        constructor(src, alt, title, description, price, parentClass, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentClass);
            this.dollarPrice = 27;
            this.convertToUAN();
        }
    
        convertToUAN() {
            return this.price *= this.dollarPrice;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length) {
                this.classes.forEach(className => element.classList.add(className));
            } else {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }
            
            element.innerHTML = `  
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }
   
    
    // native method JS
    Object(_services_services__WEBPACK_IMPORTED_MODULE_0__["getResourse"])('http://localhost:3000/menu') // ф=я getResourses винесена в services.js
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) =>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
        });
    });
    
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) =>{
    //         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/original.svg',
        success: 'Спасибо мы скоро с вами свяжемся!',
        failure: 'Loading is fail!'
    };

    forms.forEach(el => {
        bindPostData(el);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form); // консруктор який збирає всі дані з інпутів форми в обєкт
            
            // перетворюєм formData в JSON
            // const object = {};
            // formData.forEach(function(value,key){
            //     object[key] = value;
            // });

            // ще один спосіб перетворення FormData в JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json) // ф=я postData винесена в servisec.js
                .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                        statusMessage.remove();
                }).catch(() => {
                        showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal_title" >${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])();
        }, 3000);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, closeModal, openModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    // modal.classList.add('hide');
    // modal.classList.remove('show');
    document.body.style.overflow = 'visible';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    // modal.classList.add('show');
    // modal.classList.remove('hide');
    // але при появі модального вікна ми можемо cкролити сайт
    // щоб запобігти цьому
    document.body.style.overflow = 'hidden';
    if(modalTimerId) {
        clearInterval(modalTimerId);
    } 
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    const btnOpenModal = document.querySelectorAll(triggerSelector);


    btnOpenModal.forEach((btn) => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // обгортаєм openModal(modalSelector), щоб вона не викликалась відразу, а лише після кліку    
    });


    // закриває модальне вікно коли клікаєм поза ним
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') === '') {
            closeModal(modalSelector); 
        }
    });

    document.addEventListener('keydown', (e)=> { 
        if (e.code === 'Escape') { // можна добавити умову && modal.classList.contains('show');
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        // прокрутка і контент який прокрутили і порівнюєм зі всією довжиною сайту
        if (window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
                openModal(modalSelector, modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
            }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function slider({slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    
    let slideIndex = 1;
    let offset = 0;
    
    const slides = document.querySelectorAll(slide);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const width = window.getComputedStyle(slidesWrapper).width,
        dotsField = document.createElement('ul');
        dotsField.classList.add('carousel-indicators');
        slidesWrapper.append(dotsField);



    for ( let i = 0; i < slides.length; i++) {
        const   dot = document.createElement('li');
            dot.classList.add('dot');
            if( i === 0 ) {
                dot.classList.add('active-dot-slider');
            }
            dotsField.append(dot);
    }

    const dots = document.querySelectorAll('.dot');

    

    current.textContent = `${slideIndex}`;

    if(slideIndex < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    }  else {
        total.textContent = `${slides.length}`;
        current.textContent = `${slideIndex}`;
    }

    function chackCurrent(cur) {
        if(cur < 10) {
            current.textContent = `0${cur}`;
        }  else {
            current.textContent = `${cur}`;
        }
    }
    function convertSizeToNumber(width) {
    return  parseFloat(width.replace(/\D/g, ''));

    }



    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.cssText = 'overflow: hidden;position: relative;';


    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if(offset === convertSizeToNumber(width) * (slides.length-1)) { // '500px'
            offset = 0;
        } else {
            offset += convertSizeToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        chackCurrent(slideIndex);
        clearActive();
        addActive();
    });

    prev.addEventListener('click', () => {
        if(offset === 0) { // '500px'
            offset = convertSizeToNumber(width) * (slides.length - 1);
        } else {
            offset -= convertSizeToNumber(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        chackCurrent(slideIndex);
        clearActive();
        addActive();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click',(e) => {
            slideIndex = index + 1;
            chackCurrent(slideIndex);
            if (slideIndex != 1 || slideIndex == slides.length) {
                offset = convertSizeToNumber(width) * (index);  
            } else if (slideIndex === index+1) {
                offset = 0;
            } else {
                offset = convertSizeToNumber(width)/(index);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            clearActive();
            addActive(); 
        });
    });

    function clearActive() {
        dots.forEach((dot, index) => {
            dot.classList.remove('active-dot-slider');
        });
    }

    function addActive() {
        dots.forEach((dot, index) => {
            if (index+1 === slideIndex) {
                dot.classList.add('active-dot-slider');
            }
        });
    }
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Tabs


function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    
    const tabheaderElem = document.querySelectorAll(tabsSelector);
    const tabs = document.querySelectorAll(tabsContentSelector);
    const tabheaderItems = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabs.forEach((el)=> {
            el.classList.add('hide');
            el.classList.remove('show', 'fade');
        });
        tabheaderElem.forEach((el) => {
            el.classList.remove(activeClass);
        });
    }
    function showeTabContent(i = 0) {
        tabs[i].classList.add('show','fade');
        tabs[i].classList.remove('hide');
        tabheaderElem[i].classList.add(activeClass);
    }

    tabheaderItems.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabheaderElem.forEach((el, index) => {
                if (target == el) {
                    hideTabContent();
                    showeTabContent(index);
                }
            });
        }
    });

    hideTabContent();
    showeTabContent();
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
    // const deadline = '2020-08-11';
    // const t = Date.parse(deadline) - Date.parse(new Date());
    // console.log(t); // 471733000
    // const days = Math.floor(t / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((t / (1000 * 60 * 60) % 24));
    // const minutes = Math.floor((t / 1000 / 60) % 60);
    // const seconds = Math.floor((t / 1000) % 60);
    // console.log(days); // 5
    // console.log(hours); // 10
    // console.log(minutes); // 57
    // console.log(seconds); //56


    // create own object with data values between actual data and deadline
    function getTimeRemaining(endtime) {

        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // add zero to number
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // getting Element of DOM and adding value them
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
    // write value in Elements
        function updateClock() {

            // getting object values
            const t = getTimeRemaining(endtime);

            // writting values in element
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // stop the timer when the time will be over
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock(id, deadline);
}

// module.exports = timer;
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");









window.addEventListener('DOMContentLoaded', () =>{
    // поява модального вікна через певний час або піля  скролу
    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_6__["openModal"])('.modal', modalTimerId), 500000);

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer', '2020-08-11');
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_modules_calc__WEBPACK_IMPORTED_MODULE_3__["default"])();
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    Object(_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('[data-modal]','.modal', modalTimerId);
});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResourse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResourse", function() { return getResourse; });
const postData = async (url, data) => {
    const res = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    //ok
    // status
    return await res.json();
};



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map