
window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    
    //Запрет ввода
    const checkNumber = (num) => {
        let regexp = /[0-9/B]/i;
        if(regexp.test(num))
            return true;
        else
            return false;
    };
    const checkStringRu = (str) => {
        let regexp = /[a-яА-Я,\s]/i;
        regexp = /[А-яё/B]/i;
        if(regexp.test(str) || str == ' '){
            return true;
        } else {
            return false;
        }
    }
    const checkPhone = (phone) => {
        let regexp = /[\+0-9/B]/i;
        if(regexp.test(phone))
            return true;
        else
            return false;
    }

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
    const calcOnlyNumber = () => {
        const calc = document.getElementById('calc');
        calc.addEventListener('keydown', () => {
            if(event.target.matches('input.calc-item')){
                if(checkNumber(event.key) !== true){
                    event.preventDefault();
                    return false;
                } 
            }
        });
    };
    calcOnlyNumber();

    //Калькулятор
    const calc = (price=100) => {
        const   calcBlock = document.querySelector('.calc-block'),
                calcType = document.querySelector('.calc-type'),
                calcSquare = document.querySelector('.calc-square'),
                calcDay = document.querySelector('.calc-day'),
                calcCount = document.querySelector('.calc-count'),
                totalValue = document.getElementById('total');

        const countSum = () => {
            let showTotal = (ind) => {
                let int = setInterval(() => {
                    if(total > ind) {
                        ind++;
                    } else if(total < ind) {
                        ind--;
                    }
                    totalValue.textContent = ind;
                    if(total === ind){
                        clearInterval(int);
                    }
                }, 100);                
            };
            let total = 0,
                typeValue = +calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value,
                countValue = 1,
                dayValue = 1;
            
            if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10; 
            }

            if(calcDay.value && calcDay.value < 5){
                dayValue *= 2;
            } else if(calcDay.value && calcDay.value){
                dayValue *= 1.5;
            } 

            if(typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
                showTotal(+totalValue.textContent);
            } else {
                totalValue.textContent = total;
            }
            
        };
        
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            // if( target.matches('.calc-type') || target.matches('.calc-square') ||
            //     target.matches('.calc-day') || target.matches('.calc-count')){

            // }
            // Любой из вариантов верен
            if(target === calcType || target === calcSquare || target === calcDay || target === calcCount){
                countSum(totalValue.textContent);
            } 
        });
        
    }
    calc(100);

    //send-ajax-form
    const sendForm = (element) => {
        const   errorMessage = 'Что-то пошло не так...',
                loadMessage = 'Загрузка',
                successMessage = 'Спасибо! Мы скоро с Вами свяжемся!';
        
        const form = element;

        const statusMessage = document.createElement('div');
        
        const inputs = form.querySelectorAll('input');

        const clearInput = () => {
            inputs.forEach((value, key) => {
                value.value = ''
            })
        }

        const banChars = () => {
            form.addEventListener('keydown', (event) => {
                const target = event.target;
                if(event.target.matches('input[name=user_name]') || event.target.matches('input[name=user_message]')){
                    if(checkStringRu(event.key) !== true){
                        event.preventDefault();
                        return false;
                    }  
                }
                if(event.target.matches('input[name=user_phone]')){
                    if(checkPhone(event.key) !== true){
                        event.preventDefault();
                        return false;
                    }  
                }
            });
        }
        banChars();

        statusMessage.textContent = 'Тут будет сообщение';
        statusMessage.style.cssText = 'font-size: 2rem; opacity:0';
        statusMessage.classList.add('messageForm');
        
        const showMessage = (elem) => {
            let step = 0.1;
            let setInt = setInterval(() => {
                step += 0.1;
                if(step === 1){
                    clearInterval(setInt);
                }
                elem.style.opacity = step;
            }, 100);
        }
        //showMessage(element.querySelector('.messageForm'));
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            form.appendChild(statusMessage);
            showMessage(element.querySelector('.messageForm'));
            let body = {};


            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body, () => {
                statusMessage.textContent = successMessage;
                clearInput();
            }, (error) => {
                statusMessage.textContent = errorMessage;
                console.error();
            });
        });

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                statusMessage.textContent = loadMessage;
    
                if(request.readyState !== 4){
                    return;
                }

                if(request.status === 200){
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');
            //request.setRequestHeader('Content-type', 'multipart/form-data');
            request.setRequestHeader('Content-type', 'application/json');
            
            //request.send(formData);
            request.send(JSON.stringify(body));
        }
    };
    
    sendForm(document.getElementById('form1'));
    sendForm(document.getElementById('form2'));
    sendForm(document.getElementById('form3'));
});
