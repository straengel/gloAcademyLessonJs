
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
                    target.closest('menu li')
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

    //слайдер 
    const slider = () => {
        const   slide = document.querySelectorAll('.portfolio-item'),
                btn = document.querySelectorAll('.portfolio-btn'),
                slider = document.querySelector('.portfolio-content');

        let     interval, 
                dots,
                currentSlide = 0; //номер слайдра

        const generateDot = () => {
            const rootDot = document.querySelector('.portfolio-dots');
            let elemNew = ``;
            slide.forEach((elem, index) => {
                if(index === 0){
                    elemNew += `<li class="dot dot-active"></li>`;
                } else {
                    elemNew += `<li class="dot"></li>`;
                }
            });
            rootDot.insertAdjacentHTML('beforeend', elemNew);
            dots = document.querySelectorAll('.dot');
        };

        generateDot();
        
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide = (time=3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval)
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;
            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dots.forEach((elem, index) => {
                    if(elem === target){
                        currentSlide = index;
                    }
                })
            } 
            
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn, .dot')){
                stopSlide();
            }

        });

        slider.addEventListener('mouseout', (event) => {
            let target = event.target;
            if(event.target.matches('.portfolio-btn, .dot')){
                startSlide();
            }
        });

        startSlide();
    }   
    slider(); 

    //Наша команда изменение фоток
    const changeImg = () => {
        const imgOurCommands = document.getElementById('command');
        let dataImg;
        imgOurCommands.addEventListener('mouseover', (event) => {
            if(event.target.matches('.command__photo')){
                dataImg = event.target.src;
                event.target.src = event.target.getAttribute('data-img');
            }
        });

        imgOurCommands.addEventListener('mouseout', (event) => {
            if(event.target.matches('.command__photo')){
                event.target.src = dataImg;
            }
        });
    };
    changeImg();

    //Расчитать стоимость
    const calc = () => {
        const calc = document.getElementById('calc');
        const checkNumber = (num) => {
            let regexp = /[0-9]/i;
            if(regexp.test(num))
                return true;
            else
                return false;
        };
        calc.addEventListener('keydown', () => {
            if(event.target.matches('input.calc-item')){
                if(checkNumber(event.key) !== true){
                    event.preventDefault();
                    return false;
                } 
            }
        });
    };
    calc();
});
