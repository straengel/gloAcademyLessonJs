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
}

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('.budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('.budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('.expenses_month-value'),
    accumulatedMonthValue = document.getElementsByClassName('.target-amount')[0], //а хрен знает че
    additionalIncomeValue = document.getElementsByClassName('additional_expenses-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select');

let money;

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
    start: function() {
       money = isNumber(prompt('Ваш месячный доход?', 30000));
        do {
            money = isNumber(prompt('Ваш месячный доход?', 30000));
            console.log(money);
        }
        while(isNaN(money) || money == '' || money == null);
        appData.asking();
        appData.getExpensesMonth();
        appData.getBudget();
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
        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
        appData.budgetDay = appData.budgetMonth/30;
    },
    getExpensesMonth : function(){
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
start = addEventListener('click', appData.start);
/*
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