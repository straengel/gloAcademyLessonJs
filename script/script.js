'use strict';
document.addEventListener('DOMContentLoaded', function() {
    class DomElement{
        constructor(selector, height, width, bg, fontSize){
            this.selector = selector;
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
        }
    
        createElementDom(){
            let el,
            str = this.selector,
            symb = str[0];
            str = str.substring(1);
            if(symb === '.'){
                el = document.createElement('div');
                el.setAttribute('class', str);
            } else if(symb === '#'){
                el = document.createElement('p');
            }
            el.style.cssText = `
                height: ${this.height}px;
                width: ${this.width}px;
                background: ${this.bg};
                font-size: ${this.fontSize}px;
                position: absolute;
            `;
            return el;
        }
    }
    let objDom = new DomElement('#', 100, 100, 'green', 16),
    el;
    
    el = objDom.createElementDom();
    document.body.insertBefore(el, document.body.firstChild);
    el.textContent='Hello World!';
    document.body.addEventListener('keydown', (e)=>{
        let key = e.keyCode,
        perStep = 10;      
        switch (key) {
            case 38: //38 = up
                if((el.getBoundingClientRect().top - perStep) < 0){
                    el.style.top = 0+'px';
                } else {
                    el.style.top = (el.getBoundingClientRect().top - perStep) + 'px';
                }
                break;
            
            case 39://39 = right
                el.style.left = (el.getBoundingClientRect().left + perStep) + 'px';
                break;
            case 40: //40 = down
                el.style.top = (el.getBoundingClientRect().top + perStep) + 'px';
                break;
            case 37: //37 = left
                if((el.getBoundingClientRect().left - perStep) < 0){
                    el.style.left = 0+'px';
                } else {
                    el.style.left = (el.getBoundingClientRect().left - perStep) + 'px';
                }
                break;
            default:
                break;
        }
    });
}, false);


//console.log(el);
//document.body.insertBefore(el, document.body.firstChild);


/**
 * 3 правила this
 * 1. Привязка по умолчанию foo() в  this будет объект window
 * 2. не явная привязка obj.foo() в  this будет объект obj
 * 3. Явная привязка нужна для того, чтобы использовать конкретный объект при вызове функции
 * apply - принимает массив аргументов, которые будут разобраны и переданы в функцию, которую вызываем
 * call - принимает сколько угодно параметров через запятую
 * оба метода первым параметром принимает объект тот, 
 * который мы хотим привязать к контексту вызова this
 * 4. Привязка new
 let obj = {
     x: 10,
     y: 15
 }
 function newTest(){
     console.log('this: ', this)
 }
 newTest.apply(obj);
 newTest.call(obj);
 */
/**
 * Есть трюк жесткая привязка, когда внутри фнукции вызываем жесткую привязку
 * function hardBind(hard){
 *  newTest.call(herd)
 * } 
 * setTimeout(hardBind, 500, obj);
 * выведиться obj в консоли
 */
/*
function pow(x, n) {
  let result = 1;
  for (let i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}
let x = promt('x?', '');
let n = prompt('n?', '');
if (n < 0) {
  alert('Степень ' + n +
  'не поддерживается, введите целую степень больше 0');
} else {
  alert( pow(x, n) );
}
/**/
/*
* пример блокировки
additionalExpensesItem.addEventListener('keydown', function(e){
    if(appData.checkString(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
//*/