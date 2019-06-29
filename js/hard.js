let num = 266219, numResult;
num = String(num);
num = num.split('');
//console.log(num); //Проверка
//console.log(typeof num); //Проверка
for (let i = 0; i < num.length; i++){
    if (i == 0)
        numResult = eval(num[i]);
    else
        numResult *= eval(num[i]);
}

//console.log( 2*6*6*2*1*9 ); //Проверка
//console.log( numResult ); //Проверка
//console.log( numResult ** 3 ); //Проверка
//console.log( Math.pow(num, 3) ); //Проверка
console.log( 'Вывести в консоль произведение (умножение) цифр этого числа ' + numResult );

numResult = numResult ** 3;
console.log ( 'Вывести на экран первые 2 цифры полученного числа ' + String(numResult).slice(0,2));
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