'use strict';
function addZero(str){
    str = String(str);
    if(str.length < 2)
        str = '0'+ str;
    return str;
}
//Выведите на страницу текущую дату и время в формате '09:59:59 30.05.2018'
let gDate = new Date();
let formateDate = `${addZero(gDate.getHours())}:${addZero(gDate.getMinutes())}:${gDate.getSeconds()} ${addZero(gDate.getDate())}.${addZero(gDate.getMonth()+1)}.${addZero(gDate.getFullYear())}`;
document.querySelector('#dateFirst').textContent = formateDate;
