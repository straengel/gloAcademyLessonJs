'use strict';

function  showString(str){

    let maxSize = 30;

    if(typeof str != 'string')
        showString(prompt('Введите строку'));
    else
        str = str.trim();

    return str.length > maxSize ? (str.slice(-maxSize) + '...') : str;
}

console.log(showString('asdf asdf asdf asf af asdf dasf asfadsf as'));
