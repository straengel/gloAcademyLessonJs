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
function isNumber(num) {
    let result;

    if(!isNaN(parseFloat(num))) {
        result = parseFloat(num);
    } else {
        alert('Неправильно введены данные, будет присвоено значение по умолчанию - 1');
        result = 1;
    }
      
    return result;
}
let money = isNumber(prompt('Ваш месячный доход?', '30000')), //при отмене null
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Налоги, Квартира, Пиво'), 
    deposit = confirm('Есть ли у вас депозит в банке?'), //в случаи согласия сохранит true, в противном случаи false
    income = 'Фрилансер',
    questionExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Дорога'),
    questionExpenditure1 = isNumber(prompt('Во сколько это обойдется?', '2000')),
    questionExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Налоги'),
    questionExpenditure2 = isNumber(prompt('Во сколько это обойдется?', '3000')),
    mission = 2500000,
    budgetMonth = money - questionExpenditure1 - questionExpenditure2,
    budgetDay = Math.floor(budgetMonth/30);

console.log(addExpenses.split(', '));
console.log(typeof parseFloat(money), typeof income, typeof deposit);
console.log('Вычислить доход за месяц, учитывая обязательные расходы ' + budgetMonth);
console.log('Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, '+
  'вывести в консоль, округляя в большую сторону ' + Math.ceil(mission/budgetMonth));
console.log('Дневной бюджет с поправкой на месячный бюджет с округлением в меньшую сторону ' + 
    budgetDay);
if(budgetDay > 800) {
    console.log('Высокий уровень дохода');
} else if(budgetDay > 300) {
    console.log('Средний уровень дохода');
} else if(budgetDay > 0) {
    console.log('Низкий уровень дохода');
} else {
    console.log('Что то пошло не так');
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