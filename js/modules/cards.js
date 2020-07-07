import {getResourse} from '../services/services';

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
    getResourse('http://localhost:3000/menu') // ф=я getResourses винесена в services.js
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

export default cards;