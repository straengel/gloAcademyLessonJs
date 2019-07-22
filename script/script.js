'use strict';
function getResult(a,b){
    let result='', sum=0, lastEl, arr;
    arr = a ** b;
    lastEl = String(arr).split('').length;
    arr = String(arr).split('').map((item, i)=>{
        if(i == (lastEl-1)){
            result += String(item) + '=';
        } else {
            result += String(item) + '+';
        }
        sum += Number(item);
    });
    result = result + sum;
    return result;
}
console.log(getResult(3, 10));