
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

//Показать тип    
let showTypeof = function(item) {
    console.log(typeof item);
};

let money, 
    addExpenses,
    deposit, 
    income = 'Фрилансер',
    mission = 2500000;

let appData = {
    /*
    start : function() {
        money = isNumber(prompt('Ваш месячный доход?', 30000));
        addExpenses = prompt(
            'Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Налоги, Квартира, Пиво'
        );
        deposit = confirm('Есть ли у вас депозит в банке?');
        if(isNaN(money) || money == '' || money == null){
    
            do {
                money = isNumber(prompt('Ваш месячный доход?', 30000));
                console.log(money);
            }
            while(isNaN(money) || money == '' || money == null);
        }
        this.budget;
    },
    */
    budget : 0,
    budgetDay : 0,
    budgetMonth : 0,
    //считаем расходы за месяц
    expenses : {},
    expensesMonth : function(){
        let sum = 0;
        for (let key in this.expenses) {
            sum += this.expenses[key];
        }
        return sum;
    },
    //Вопросы по расходам
    asking : function(){
        for (let i = 0; i < 2; i++) {
            this.expenses['Вопрос '+(i+1)+':' 
            + prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Дорога')] 
            = isNumber(prompt('Во сколько это обойдется?', 300));
        }
    },
    //считаем бюджет budgetDay и budgetMonth
    getBudget : function() {
        this.budgetMonth = this.budget - this.expensesMonth();
        this.budgetDay = this.budgetMonth/30;
    },
    //Считаем за сколько достигнем цели
    getTargetMonth : function() {
        return mission / this.budgetDay;
    },
    //Выводим статус
    getStatusIncome : function() {
        if (this.budgetDay > 800) {
            return('Высокий уровень дохода');
        } else if (this.budgetDay > 300 && this.budgetDay < 800) {
            return('Средний уровень дохода');
        } else if (this.budgetDay > 0 && this.budgetDay < 300) {
            return('Низкий уровень дохода');
        } else if (this.budgetDay < 0){
            return('Что-то пошло не так');
        } else {
            return('Нулевой уровень дохода');
        }
    }
};
//Просто функция старт
/**/ 
let start = function() {
    appData.budget = money = isNumber(prompt('Ваш месячный доход?', 30000));
    addExpenses = prompt(
        'Перечислите возможные расходы за рассчитываемый период через запятую', 
        'Налоги, Квартира, Пиво'
    );
    deposit = confirm('Есть ли у вас депозит в банке?');
    if(isNaN(money) || money == '' || money == null){

        do {
            money = isNumber(prompt('Ваш месячный доход?', 30000));
            console.log(money);
        }
        while(isNaN(money) || money == '' || money == null);
    }
};
//Начнем
start();
//спросим о расходах
appData.asking();
//расчитаем бюджет
appData.getBudget();

console.log('Месячный доход  ' + appData.budget);
console.log('Дневной бюджет ' + appData.budgetDay);
console.log('Месячный бюджет с учетом расходов ' + appData.budgetMonth);
console.log('За сколько будет достигнута цель ' + appData.getTargetMonth());
console.log('Ваш статус: ' + appData.getStatusIncome());

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
*/
//четвертый урок