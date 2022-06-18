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
    let deadline = '2022-06-20',
    id,
    timer;
    
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
            days,
            hours,
            minutes,
            seconds,
            status = false;

            if(timeDiff > 0) {

                status = true;
                days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
                hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((timeDiff / (1000 * 60 )) % 60),
                seconds = Math.floor((timeDiff / 1000 ) % 60);
            }
            else {
                status = false;
                days = 0;
                hours = 0;
                minutes = 0;
                seconds = 0;
            }

            return {
                status: status,
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            };
    };

    function changeTimerBlock(timer) {

            let d = declOfNum(timer.days, ['день', 'дня', 'дней']);
            let h = declOfNum(timer.hours, ['час', 'часа', 'часов']);
            let m = declOfNum(timer.minutes, ['минута', 'минуты', 'минут']);
            let s = declOfNum(timer.seconds, ['секунда', 'секунды', 'секунд']);

            document.querySelector('#days').parentNode.innerHTML =`<span id="days">${timer.days}</span>${d}`;
            document.querySelector('#hours').parentNode.innerHTML =`<span id="hours">${timer.hours}</span>
            ${h}`;
            document.querySelector('#minutes').parentNode.innerHTML = `<span id="minutes">${timer.minutes}</span>
            ${m}`;
            document.querySelector('#seconds').parentNode.innerHTML = `<span id="seconds">${timer.seconds}</span>
            ${s}`; 
    }


    function showTimerBlock() {
        timer = dateRemaining(deadline); 
        changeTimerBlock(timer);
        if(timer.status == false) clearInterval(id); 
    };

    showTimerBlock();
    id = setInterval(showTimerBlock, 1000);

});

