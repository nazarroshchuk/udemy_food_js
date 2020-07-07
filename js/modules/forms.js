import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', json) // ф=я postData винесена в servisec.js
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
        openModal('.modal', modalTimerId);

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
            closeModal();
        }, 3000);
    }
}
export default forms;