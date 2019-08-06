
window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    


    function countTimer(deadline){
        const   timeHours = document.querySelector('#timer-hours'),
                timeMinutes = document.querySelector('#timer-minutes'),
                timeSeconds = document.querySelector('#timer-seconds');
        timeHours.textContent = '00';
        timeMinutes.textContent = '00';
        timeSeconds.textContent = '00';

        function getTimeRemaining(){
            let dateNow = new Date().getTime() + new Date().getTimezoneOffset(0) * 60 * 1000;
            let timeRemaining = (deadline - dateNow) / 1000,
            hours = Math.floor((timeRemaining / 60) / 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            seconds = Math.floor(timeRemaining % 60),
            plusDay = 86400000;
            if(dateNow >= deadline){
                countTimer(dateNow+plusDay);
            }
            return { hours, minutes, seconds, timeRemaining };
        }
        
        function addZero(str){
            str = String(str);
            if(str.length < 2)
                str = '0'+ str;
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
    countTimer(new Date('25 july 2019').getTime());
    //setInterval(countTimer, 1000, '29 july 2019');
});
