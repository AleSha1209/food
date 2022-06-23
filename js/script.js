document.addEventListener('DOMContentLoaded', () => {


    //Tabs
    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabcontainer');

    /*function showTabContent() {
        tabs.forEach(function(item, i) {
            if(item.classList.contains('tabheader__item_active')) {
                tabsContent[i].style.display = 'block';
            } 
            else tabsContent[i].style.display = 'none';
        });
    };
    showTabContent();
    
    tabsParent.addEventListener('click', (event) => {

        let target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach(function(item, i) {
                if(item.classList.contains('tabheader__item_active')) {
                    item.classList.remove('tabheader__item_active');
                }  
                if(item != target) {
                    tabsContent[i].style.display = 'none';
                }  
                else tabsContent[i].style.display = 'block';
            });
        target.classList.add('tabheader__item_active');
        }
    

    });
    */

    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';
            item.classList.remove('show','fade');
            item.classList.add('hide');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        //tabsContent[i].style.display = 'block';
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show','fade');
        tabs[i].classList.add('tabheader__item_active');
    };
    hideTabContent();
    showTabContent(0);
    tabsParent.addEventListener('click', function(event) {
        let target = event.target;
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach(function(item, i) {
                if(target == item){
                   hideTabContent();
                    showTabContent(i); 
                } 
            });  
        };
    });


    //Timer
    let deadline = '2022-06-30';
    
    function declOfNum(n, textForms) {  
        n = Math.abs(n) % 100; 
        var n1 = n % 10;
        if (n > 10 && n < 20) { return textForms[2]; }
        if (n1 > 1 && n1 < 5) { return textForms[1]; }
        if (n1 == 1) { return textForms[0]; }
        return textForms[2];
    }

    function dateRemaining(endtime) {

        let t = Date.parse(endtime),
        userTime = new Date(),
        timeDiff = t - Date.parse(userTime),
        status = 0,
        days,
        hours,
        minutes,
        seconds;

        if(timeDiff > 0 ) {
            status = timeDiff;
            days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((timeDiff / (1000 * 60 )) % 60);
            seconds = Math.floor((timeDiff / 1000 ) % 60);
        }
        else {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
    
        return {
            status: timeDiff,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    };

    function changeTimerBlock(selector, endtime) {
            
            let timerBlock = document.querySelector(selector),
            //days = timerBlock.querySelector('#days'),
            //hours = timerBlock.querySelector('#hours'),
            //minutes = timerBlock.querySelector('#minutes'),
            //seconds = timerBlock.querySelector('#seconds'),
            id = setInterval(updateTimerBlock, 1000);

            updateTimerBlock();

            function updateTimerBlock() {

                let timer = dateRemaining(endtime),
                d = declOfNum(timer.days, ['день', 'дня', 'дней']),
                h = declOfNum(timer.hours, ['час', 'часа', 'часов']),
                m = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']),
                s = declOfNum(timer.seconds, ['секунда', 'секунды', 'секунд']);

                timerBlock.querySelector('#days').parentNode.innerHTML =`<span id="days">${timer.days}</span>${d}`;
                timerBlock.querySelector('#hours').parentNode.innerHTML =`<span id="hours">${timer.hours}</span>
                ${h}`;
                timerBlock.querySelector('#minutes').parentNode.innerHTML = `<span id="minutes">${timer.minutes}</span>
                ${m}`;
                timerBlock.querySelector('#seconds').parentNode.innerHTML = `<span id="seconds">${timer.seconds}</span>
                ${s}`; 

                if(timer.status <= 0) clearInterval(id);
            };

            
    }
    changeTimerBlock('.timer', deadline);


    //Modal

    let btnOpenModal = document.querySelectorAll('[data-modal]'),
        btnCloseModal = document.querySelector('[data-modal-close]'),
        modal = document.querySelector('.modal'),
        timeOutID;

        function openModal() {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflowY = 'hidden';
        }

        btnOpenModal.forEach((item) => {
            item.addEventListener('click', (event) => {
                openModal(modal);
            });
        });

        function closeModal () {
                modal.classList.remove('show');
                modal.classList.add('hide');
                document.body.style.overflow = '';
        }

        modal.addEventListener('click', (event) => {
           if(event.target && event.target === modal) {
                closeModal();
           }
        });

        btnCloseModal.addEventListener('click', closeModal);

        document.addEventListener('keydown', (event) => {
            if(event.key == 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        timeOutID = setTimeout(openModal, 10000);

        let h = document.body.scrollHeight;
        let i = document.body.scrollTop;

        window.addEventListener('scroll', showModalByScroll);

        function showModalByScroll() {
            if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            };
        };

        //





});

