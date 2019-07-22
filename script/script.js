'use strict';

class DomElement{
    constructor(selector, height, width, bg, fontSize){
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    createElementDom(str){
        let el,
        symb = str[0];
        str = str.substring(1);
        if(symb === '.'){
            el = document.createElement('div');
            el.setAttribute('class', str);
        } else if(symb === '#'){
            el = document.createElement('p');
        }
        el.cssText
    }


}
let el = new DomElement()
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