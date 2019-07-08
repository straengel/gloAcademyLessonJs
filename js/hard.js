'use strict';
let week = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
],
    date = new Date();
    
week.forEach(function(item, i) {
    let style = "";
    if(i == (date.getDay() - 1)) {
        style += "font-style: italic;";
    } 
    if(i == 5 || i == 6){
        style += "font-weight: bold;";
    } 
    console.log('%c'+item, style);
});