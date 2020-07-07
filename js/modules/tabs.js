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

export default tabs;