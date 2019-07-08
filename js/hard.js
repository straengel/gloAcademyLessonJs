'use strict';

let arrNum = ['312', '425', '947', '245', '627', '738', '8013'];

let sortArrNum = function(arr){
    let newArr = [];
    for(let i = 0; i < arr.length; i++){
        if((arr[i] [0]) == '2' || (arr[i] [0]) == '4'){
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
console.log(sortArrNum(arrNum));

//Простые числа
let maxSizeNum = 100;

for (let i=2;  i<=maxSizeNum; i++) {
    let count = 0, jj;
    for (let j=2; j<i; j++) {
        
        if (i%j) 
            continue;
        jj = j;
        count += 1;
    }
    if (!count) 
        console.log('Делители этого числа: 1 и ' + i);
}

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
*/