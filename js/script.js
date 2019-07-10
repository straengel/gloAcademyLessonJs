'use strict';
//проверка на валидность чисел
function isNumber(num) {
    let result;
    if(!isNaN(parseFloat(num))) {
        result = parseFloat(num);
    } else if(!isNaN(parseInt(num))){
        result = parseInt(num);
    } else {
        result = prompt('Неправильно введены данные, введите данные заново, должно быть число, дробное с точкой');
        isNumber(result);
    }
    return Number(result);
}
function isString(str) {
    return isNaN(str) ? str : 'Введите строку';
    // str = +prompt('Необходимо ввести строку');
    // console.log(str);
    // if(typeof str === 'string'){
    //     return str;
    // }
        
    // return isString();
}
console.log(isString(prompt('asdfasdf')));

let money;

//Просто функция старт
let start = function() {
    appData.budget = money = isNumber(prompt('Ваш месячный доход?', 30000));
    if(isNaN(money) || money == '' || money == null){

        do {
            money = isNumber(prompt('Ваш месячный доход?', 30000));
            console.log(money);
        }
        while(isNaN(money) || money == '' || money == null);
    }
};
//Начнем


let appData = {
    budget : money,
    budgetDay : 0,
    budgetMonth : 0,
    //Дополнительный заработок
    income : {},
    addIncome : {}, //не вижу в ней смысла зачем
    //считаем расходы за месяц
    expenses : {},
    //возможные расходы за период
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 5000000,
    period: 3, 
    expensesMonth : function(){
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        if(appData.income.length>0){
            for (let key in appData.income) {
                sum += appData.expenses[key];
            }
        }
        return isNumber(sum);
    },
    //Вопросы по расходам
    asking : function(){
        if(confirm('Дополнительный заработок есть?')){
            appData.income[isString(prompt('Какой у вас дополнительный заработок?', 'Кодю'))] = isNumber(
                prompt('Сколько в месяц вы на этом зарабатываете?', 10000)
                );
        }
        appData.addExpenses = isString(prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Налоги, Квартира, Пиво'));
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            appData.expenses['Вопрос '+(i+1)+':' 
            + isString(prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Дорога'))] 
            = isNumber(prompt('Во сколько это обойдется?', 300));
        }
    },
    //считаем бюджет budgetDay и budgetMonth
    getBudget : function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth();
        appData.budgetDay = appData.budgetMonth/30;
    },
    //Считаем за сколько достигнем цели
    getTargetMonth : function() {
        return appData.mission / appData.budgetDay;
    },
    //Выводим статус
    getStatusIncome : function() {
        if (appData.budgetDay > 800) {
            return('Высокий уровень дохода');
        } else if (appData.budgetDay > 300 && appData.budgetDay < 800) {
            return('Средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay < 300) {
            return('Низкий уровень дохода');
        } else if (appData.budgetDay < 0){
            return('Что-то пошло не так');
        } else {
            return('Нулевой уровень дохода');
        }
    },
    //добавить данный о дипозите
    getInfoDeposit: function(){
        if(appData.deposit){
            appData.percentDeposit = isNumber(prompt('Какой годовой процент?', 10));
            appData.moneyDeposit = isNumber(prompt('Какая сумма заложена?', 10000));
        }
    },
    //какой доход мы получим за период
    calcSaveMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};
start();
//спросим о расходах
appData.asking();
console.log(
    appData.addExpenses.split(', ').map(word => word[0].toUpperCase() + word.substring(1)).join(', ')
);

//расчитаем бюджет
appData.getBudget();
appData.getInfoDeposit();
console.log('Месячный доход  ' + appData.budget);
console.log('Дневной бюджет ' + appData.budgetDay);
console.log('Месячный бюджет с учетом расходов ' + appData.budgetMonth);
console.log('За сколько будет достигнута цель ' + appData.getTargetMonth());
console.log('Ваш статус: ' + appData.getStatusIncome());
console.log('какой доход мы получим за период ' + appData.period + ': ' + appData.calcSaveMoney());

for (let k in appData) {
    console.log('Наша программа включает в себя данные: ' + k);
}
/*
if (appData.getTargetMonth() < 0) {
    console.log("Цель не будет достигнута");
} else {
    console.log("Цель будет достигнута");
}
console.log('Ваш статус: ', getStatusIncome());
*/

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
/* */