import tabs  from './modules/tabs';
import timer  from './modules/timer';
import cards  from './modules/cards';
import calc  from './modules/calc';
import forms from './modules/forms';
import slider  from './modules/slider';
import modal from './modules/modal';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () =>{
    // поява модального вікна через певний час або піля  скролу
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    timer('.timer', '2020-08-11');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    modal('[data-modal]','.modal', modalTimerId);
});