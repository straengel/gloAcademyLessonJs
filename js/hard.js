'use strict';
let lang = prompt('Введите значение lang ru или en', 'ru'),
    daysWeek = {
        'ru' : ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        'en' : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    };


if(lang == 'ru')
    console.log(daysWeek.ru.join(', '));
else
    console.log(daysWeek.en.join(', '));

switch(lang) {
    case 'ru': 
        console.log(daysWeek.ru.join(': '));
        break;
    
    case 'en': 
        console.log(daysWeek.en.join(': '));
        break;
}

console.log(daysWeek[lang].join('; '));

let namePerson = prompt('Это Артем или Максим', 'Артем');
namePerson == 'Артем' ? console.log('Ваш статус Директор') 
    : namePerson == 'Максим' ? console.log('Ваш статус Преподователь') 
    : console.log('Ваш статус Студент');
//Альтернативный вариант и лучший
let status = namePerson == 'Артем' ? 'Директор' : namePerson == 'Максим' ? 'Преподаватель' : 'Студент' ;
console.log('Ваш статус ' + status);


