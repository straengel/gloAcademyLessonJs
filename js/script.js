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

//Просто функция старт
let start = function() {
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
};
start();

let questionExpenses1,
    questionExpenses2;
//Функция возвращает сумму всех расходов за месяц
let getExpensesMonth = function() {
    let sum = 0; 

    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            questionExpenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Дорога');
        } else if (i === 1) {
            questionExpenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Налоги');
        }
        sum += isNumber(prompt('Во сколько это обойдется?', 300));
    }
    
    while(isNaN(money) || money == '' || money == null) {
        getExpensesMonth();
    }
    
    return sum;
};
//проверка расходов
//console.log('sum - ' + getExpensesMonth());

//Функция возвращает Накопления за месяц (Доходы минус расходы) Результат сохранить в переменную accumulatedMonth
let expensesAmonth = getExpensesMonth();
let accumulatedMonth = function() {
    return money - expensesAmonth;
};
//проверка
//console.log(accumulatedMonth());
//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления и возвращает результат
let getTargetMonth = function() {
    return mission / accumulatedMonth();
};
if (getTargetMonth() < 0) {
    console.log("Цель не будет достигнута");
} else {
    console.log("Цель будет достигнута");
}


let budgetDay = accumulatedMonth() / 30;


//Ваш статус
let getStatusIncome = function() {
    if (budgetDay > 800) {
        return('Высокий уровень дохода');
    } else if (budgetDay > 300 && budgetDay < 800) {
        return('Средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay < 300) {
        return('Низкий уровень дохода');
    } else if (budgetDay < 0){
        return('Что-то пошло не так');
    } else {
        return('Нулевой уровень дохода');
    }
};

console.log('Ваш статус: ', getStatusIncome());
showTypeof(money); showTypeof(income); showTypeof(deposit);

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