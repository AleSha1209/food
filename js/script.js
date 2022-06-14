document.addEventListener('DOMContentLoaded', () => {
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
});

