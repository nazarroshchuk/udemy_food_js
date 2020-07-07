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

export default calc;