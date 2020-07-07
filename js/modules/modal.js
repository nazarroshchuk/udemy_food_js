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

export default modal;
export {closeModal};
export {openModal};