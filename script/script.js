
window.addEventListener('DOMContentLoaded', function(){
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
                handlerMenu = () => {
                    menu.classList.toggle('active-menu');
                };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu)); 
    };
    toggleMenu();

    //popup
    const togglePopup = () => {
        const   popup = document.querySelector('.popup'),
                popupBtn = document.querySelectorAll('.popup-btn'),
                popupClose = document.querySelector('.popup-close'),
                popupContent = popup.querySelector('.popup-content'),
                popupOffsetTop = popupContent.offsetTop,
                popupAnimate = () => {
                    if(document.documentElement.offsetWidth > 992){
                        
                        popup.style.display = 'block';
                        countTopPopup++;
                        popupContent.style.top = `${countTopPopup}px`;
                        if((window.innerHeight / 10) >= countTopPopup){
                            setTimeout(popupAnimate, 10);
                        }
                    } else {
                        popupContent.style.top = `${popupOffsetTop}px`;
                        popup.style.display = 'block';
                    }
                };
        let countTopPopup = 0;
        //обнуляем высоту
        popupContent.style.top = 0;

        popupBtn.forEach((elem) => elem.addEventListener('click', popupAnimate)); 
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
            if(document.documentElement.offsetWidth > 992){
                popupContent.style.top = `0px`;
                countTopPopup = 0;
            }
        }); 
    };
    togglePopup();
});
