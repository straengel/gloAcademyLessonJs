'use strict';
function addZero(str){
    str = String(str);
    if(str.length < 2)
        str = '0'+ str;
    return str;
}
function formatAMPM(date) {
    let hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds(),
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)} ${ampm}`;
}

function getDayNewYear(date){
    let nextDate = new Date(`December 31, ${date.getFullYear()}`),
    msPerDay = 24*60*60*1000, //Количество миллисекунд в одном дне 
    daysLeft = Math.round((nextDate.getTime() - date.getTime())/msPerDay),//Высчитываем количество дней 
    dayname,  
    ds = `${daysLeft}`, 
    dd = parseInt(ds.substr(ds.length-1)), //Вырезаем последнею цифру 
    result;

    //Склоняем слово ДЕНЬ 
    if(daysLeft > 4 && daysLeft < 21)
        dayname = ` дней`; 
    else if(dd == 1) 
        dayname = ` день`;     
    else if(dd == 2 || dd == 3 || dd == 4)
        dayname=` дня`;
    else 
        dayname = ` дней`;
    //Выводим надпись в документ 
    if(daysLeft<0) {
        result = `С новым годом!!!`;
    } else { 
        if(daysLeft==0) {
            result = `Завтра новый год!`;
        } else { 
            result = `До нового года осталось `+daysLeft+dayname+`!`;
        } 
    } 
    return result;
}

const hello = document.querySelector('#hello'),
nowDay = document.querySelector('#nowDay'),
nowTime = document.querySelector('#nowTime'),
newYaer = document.querySelector('#newYaer');

let nowDate = new Date(),
getHours = nowDate.getHours(),
getDay = nowDate.getDay() - 1,
getTime = formatAMPM(nowDate),
lastDay,
days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Тяпница',
    'Суббота',
    'Воскресенье',
];

if(getHours > 18){
    hello.textContent = 'Добрый вечер';
} else if (getHours > 12){
    hello.textContent = 'Добрый день';
} else if (getHours > 6){
    hello.textContent = 'Доброе утро';
} else {
    hello.textContent = 'Доброй ночи';
}

nowDay.textContent = `Сегодня: ${days[getDay]}`;

nowTime.textContent = `Текущее время: ${getTime}`;

newYaer.textContent = getDayNewYear(nowDate);
