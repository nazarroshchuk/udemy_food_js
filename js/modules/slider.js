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
export default slider;