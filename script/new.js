'use strict';
const   square = document.getElementById('element'),
        block = document.getElementById('block'),
        blockWidth = block.offsetWidth - 50,
        startStop = document.getElementById('start'),
        step = 10,
        animateShow = () => {
            if(offOn){
                positionLeft += step;
                if(positionLeft >= blockWidth){
                    offOn = false;
                }
            } else {
                positionLeft -= step;
                if(positionLeft === 0){
                    offOn = true;
                }
            }
            square.style.left = positionLeft + 'px';
            rAF = requestAnimationFrame(animateShow);
        };
let positionLeft = 0,
    rAF,
    offOn = true;


startStop.addEventListener('click', (event) => {
    //requestAnimationFrame(animateShow);
    //if().matches('.active')
    block.classList.toggle('active');
    if(block.matches('.active')){
        requestAnimationFrame(animateShow);
    } else {
        cancelAnimationFrame(rAF);
    }
    
});


