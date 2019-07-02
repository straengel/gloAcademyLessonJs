'use strict';
/*
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
/**/

let money = prompt('Ваш месячный доход?', '30000'), //при отмене null
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Налоги, Квартира, Пиво'), 
    deposit = confirm('Есть ли у вас депозит в банке?'), //в случаи согласия сохранит true, в противном случаи false
    income = 'Фрилансер',
    questionExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Дорога'),
    questionExpenditure1 = prompt('Во сколько это обойдется?', '2000'),
    questionExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Налоги'),
    questionExpenditure2 = prompt('Во сколько это обойдется?', '3000'),
    mission = 2500000,
    budgetMonth = money - questionExpenditure1 - questionExpenditure2;

console.log(addExpenses.split(', '));
console.log(typeof parseFloat(money), typeof income, typeof deposit);
console.log('Вычислить доход за месяц, учитывая обязательные расходы' + budgetMonth);
console.log('Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону' + Math.ceil(mission/budgetMonth));
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