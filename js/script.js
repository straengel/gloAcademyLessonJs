'use strict';
//третий урок
function isNumber(num) {

    let result;

    if(!isNaN(parseFloat(num))) {
        result = parseFloat(num);
    } else {
        result = prompt('Неправильно введены данные, введите данные заново, должно быть число, дробное с точкой');
        isNumber(result);
    }

    return result;
}

/*/с выводом модальных окон
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
/**/

//без вывода модальных окон
let money = 30000, //при отмене null
    addExpenses = 'Налоги, Квартира, Пиво', 
    deposit = true, //в случаи согласия сохранит true, в противном случаи false
    income = 'Фрилансер',
    questionExpenses1 = 'Дорога',
    questionExpenditure1 = 2000,
    questionExpenses2 = 'Налоги',
    questionExpenditure2 = 3000,
    mission = 2500000,
    budgetMonth = money - questionExpenditure1 - questionExpenditure2,
    budgetDay = Math.floor(budgetMonth/30);
/**/

let showTypeof = function(item){
    console.log(typeof item);
}

let getStatusIncome = function(){
    if(budgetDay > 800) {
        return 'Высокий уровень дохода';
    } else if(budgetDay > 300) {
        return 'Средний уровень дохода';
    } else if(budgetDay > 0) {
        return 'Низкий уровень дохода';
    } else {
        return 'Что то пошло не так';
    }
}

//Функция возвращает сумму всех расходов за месяц
function getExpensesMonth() {
    return questionExpenditure1 + questionExpenditure2;
};

//Функция возвращает Накопления за месяц (Доходы минус расходы) Результат сохранить в переменную accumulatedMonth
let accumulatedMonth = function getAccumulatedMonth() {
    return money - getExpensesMonth();
};

//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления и возвращает результат
function getTargetMonth() {
    return mission / accumulatedMonth();
};

console.log('getStatusIncome(): ', getStatusIncome());
showTypeof(money); showTypeof(income); showTypeof(deposit);

console.log(getExpensesMonth());
console.log(accumulatedMonth());
console.log(Math.floor(getTargetMonth()));
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
//четвертый урок