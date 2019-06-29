let money = 12000,
  income = 'Фрилансер',
  addExpenses = 'Квартира, Семья, Я',
  addExpensesArr = addExpenses.split(', '),
  deposit = true,
  mission = 2500000,
  period  = 7,
  budgetDay = money/30;

console.log(typeof money, typeof income, typeof deposit);
console.log(income.length);
console.log('Период ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
console.log(addExpenses.toLowerCase());
console.log(addExpensesArr);

for(let i = 0; i < Number(addExpensesArr.length); i++) {
  console.log( addExpensesArr[i] );
}

console.log('дневной бюджет ' + budgetDay);
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