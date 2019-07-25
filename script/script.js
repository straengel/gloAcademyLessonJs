window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    

    //таймер
    function countTimer(deadline){
        const   timeHours = document.querySelector('#timer-hours'),
                timeMinutes = document.querySelector('#timer-minutes'),
                timeSeconds = document.querySelector('#timer-seconds');
        timeHours.textContent = '00';
        timeMinutes.textContent = '00';
        timeSeconds.textContent = '00';
        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            day = Math.floor(timeRemaining / 360 / 24),
            hours = Math.floor((timeRemaining / 360) % 24),
            minutes = Math.floor((timeRemaining / 60) % 60),
            seconds = Math.floor(timeRemaining % 60);

            return { hours, minutes, seconds, timeRemaining };
        }
        
        function addZero(str){
            str = String(str);
            if(str.length < 2){
                str = '0'+ str;
            }
            return str;
        }

        let timeRemaining = getTimeRemaining().timeRemaining;

        function updateClock(){
            let timer = getTimeRemaining();
            timeHours.textContent = addZero(timer.hours);
            timeMinutes.textContent = addZero(timer.minutes);
            timeSeconds.textContent = addZero(timer.seconds);
        }

        


        if(timeRemaining > 0){
            let setInt = setInterval(updateClock, 1000);
            setTimeout(function(){
                clearInterval(setInt);
            }, timeRemaining*1000);
        } 
       
    }
    countTimer('26 july 2019');

    //меню
    const toggleMenu = () => {
        const   btnMenu = document.querySelector('.menu'),
                menu = document.querySelector('menu'),
                closeBtn = document.querySelector('.close-btn'),
                menuItems = menu.querySelectorAll('ul > li'),
                body = document.querySelector('body'),
                handlerMenu = () => {
                    menu.classList.toggle('active-menu');
                };

        //btnMenu.addEventListener('click', handlerMenu);

        //closeBtn.addEventListener('click', handlerMenu);

        //menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu)); 
        body.addEventListener('click', (event) => {
            let target = event.target;
            if(menu.classList.contains('active-menu') === false && target.closest('.menu')){
                menu.classList.toggle('active-menu');
            } else {
                if(
                    (!target.closest('menu') && menu.classList.contains('active-menu') === true) || 
                    target.closest('.close-btn') ||
                    target.closest('li')
                ){
                    menu.classList.toggle('active-menu');
                }
            }
            
        });
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const   popUp = document.querySelector('.popup'),
                popUpBtn = document.querySelectorAll('.popup-btn');
        

        popUpBtn.forEach((elem) => elem.addEventListener('click', () => {
            popUp.style.display = 'block';
        })); 

        popUp.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('popup-close')){
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if(!target){
                    popUp.style.display = 'none';
                }
            }
        });
    };
    togglePopUp();

    //табы
    const tabs = () => {
        const   tabHeader = document.querySelector('.service'),
                tab = tabHeader.querySelectorAll('.service-header-tab'),
                tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab'); // если не найдет, то вернет null
            if(target) {
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }            
        });
    };
    tabs();
});