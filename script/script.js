
window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    


    function countTimer(deadline){
        const   timeHours = document.querySelector('#timer-hours'),
                timeMinutes = document.querySelector('#timer-minutes'),
                timeSeconds = document.querySelector('#timer-seconds');
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
        
        function updateClock(){
            let timer = getTimeRemaining();
            timeHours.textContent = timer.hours;
            timeMinutes.textContent = timer.minutes;
            timeSeconds.textContent = timer.seconds;
            if(timer.timeRemaining > 0){
                setTimeout(updateClock, 1000);
                console.log(timer);
            }
        }

        updateClock();
    }
    countTimer('25 july 2019');
    //setInterval(countTimer, 1000, '29 july 2019');
});
