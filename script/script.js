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
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('target-amount')[0], //а хрен знает че
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    //incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'), //обяхательные расходы
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select'), //ползунок
    periodAmount = document.querySelector('.period-amount'), //цифирка под ползунком
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'), //Цели
    dataInputs;

let money;

let appData = {
    budget : 0, //просто бюджет
    budgetDay : 0, //дневной доход
    budgetMonth : 0, //месячный доход
    income : {}, //ДОПОЛНИТЕЛЬНЫЙ ЗАРАБОТОК
    addIncome : [], //ДОПОЛНИТЕЛЬНЫЙ ДОХОД
    incomeMonth: 0, //ДОПОЛНИТЕЛЬНЫЙ ДОХОД в месяц
    expenses : {}, //записываем название и стоимость ОБЯЗАТЕЛЬНЫХ РАСХОДОВ
    expensesMonth: 0, //считаем расходы за месяц
    addExpenses: [], //Возмодные расходы
    deposit: false, //Дипозит
    percentDeposit: 0, // Процент за депозита
    moneyDeposit: 0, //Деньги на дипозитном счету
    start: function() {
        /**
         * 7) Вместо проверки поля Месячный доход в методе Start, 
         * запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой
         */
        if(salaryAmount.value === ''){
            start.setAttribute('disabled', true);
            return;
        } 
        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
        /**
         * 6) Блокировать все input[type=text] с левой стороны 
         * после нажатия кнопки рассчитать, 
         * после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить (есть в верстке) 
         * на кнопку сбросить пока ничего не навешиваем
         */
        dataInputs = document.querySelectorAll('.data input[type=text]');
        dataInputs.forEach(function(item){
            item.setAttribute('disabled', true);
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        //3) Округлить вывод дневного бюджета
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        //5) Добавить обработчик события внутри метода showResult, 
        //который будет отслеживать период и сразу менять значение в поле “Накопления за период”
        //ну он не будет отслеживать вот прям так
        periodSelect.addEventListener('change', appData.calcPeriod);
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    //считаем бюджет budgetDay и budgetMonth
    getBudget : function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth/30;
    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        /** HARD
         * 1) Реализовать так, чтобы инпуты добавлялись пустые 
         * без value при добавлении новых полей в обязательных расходах и дополнительных доходах 
         */
        /*
        cloneExpensesItem.querySelector('.expenses-title').addEventListener('keydown', function(e){
            if(appData.checkString(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });
        cloneExpensesItem.querySelector('.expenses-amount').addEventListener('keydown', function(e){
            if(appData.checkNumber(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });
        /** */
        cloneExpensesItem.querySelectorAll('input').forEach(function(item){
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        document.querySelectorAll('.expenses-items').forEach(function(item){
            item.querySelector('.expenses-amount').addEventListener('keydown', function(e){
                if(appData.checkNumber(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
            item.querySelector('.expenses-title').addEventListener('keydown', function(e){
                if(appData.checkString(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
        });

        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3)
            expensesPlus.style.display = 'none';
    },
    //2) Создать метод addIncomeBlock аналогичный addExpensesBlock
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        /**
         * 1) Реализовать так, чтобы инпуты добавлялись пустые 
         * без value при добавлении новых полей в обязательных расходах и дополнительных доходах 
         */
        cloneIncomeItem.querySelectorAll('input').forEach(function(item){
            item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        document.querySelectorAll('.income-items').forEach(function(item){
            console.log(item.querySelector('.income-amount'));
            item.querySelector('.income-amount').addEventListener('keydown', function(e){
                if(appData.checkNumber(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
            item.querySelector('.income-title').addEventListener('keydown', function(e){
                if(appData.checkString(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
        });

        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3)
            incomePlus.style.display = 'none';
    },
    getExpenses: function(){
        expensesItems.forEach(function(items){
            let itemExpenses = items.querySelector('.expenses-title').value;
            let cashExpenses = items.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    //1) Переписать метод getIncome аналогично getExpenses
    getIncome: function(){
        incomeItems.forEach(function(items){
            let itemIncome = items.querySelector('.income-title').value;
            let cashIncome = items.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = +cashIncome;
                appData.incomeMonth += +cashIncome;
            }
        });        
    },
    getExpensesMonth : function(){
        let sum = 0;
        for (let key in appData.expenses) {
            sum += isNumber(appData.expenses[key]);
        }
        if(appData.income.length>0){
            for (let key in appData.income) {
                sum += isNumber(appData.expenses[key]);
            }
        }
        appData.expensesMonth = isNumber(sum);
        //return isNumber(sum);
    },
    //Считаем за сколько достигнем цели
    getTargetMonth : function() {
        return targetAmount.value / appData.budgetMonth;
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
        appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
        if(appData.deposit){
            appData.percentDeposit = isNumber(prompt('Какой годовой процент?', 10));
            appData.moneyDeposit = isNumber(prompt('Какая сумма заложена?', 10000));
        }
    },
    //какой доход мы получим за период
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
    //4) Число под полоской (range) должно меняться в зависимости от позиции range
    //изменение цифирки
    changePeriodAmount: function(){
        periodAmount.textContent = periodSelect.value;
    },
    /** Hard
     *  2) Поля с placeholder="Наименование" разрешить ввод только русских
     *  букв пробелов и знаков препинания
     */
    checkNumber: function(num){
        let regexp = /[0-9]/i;
        if(regexp.test(num))
            return true;
        else
            return false;
    },
    checkString: function(str){
        let regexp = /[a-яА-Я,\s]/i;
        regexp = /[А-яё/B]/i;
        if(regexp.test(str) || str == ',' || str == '.' || str == '!' || str == '-' || str == '_' || str == '/' || str == ' '){
            return true;
        } else {
            return false;
        }
    },
};
salaryAmount.addEventListener('keydown', function(e){
    if(this.value !== '')
        start.removeAttribute('disabled');
    else
        start.setAttribute('disabled', true);

    if(appData.checkNumber(e.key) !== true){
        e.preventDefault();
        return false;
    }        
});
/*
additionalExpensesItem.addEventListener('keydown', function(e){
    if(appData.checkString(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
/** */
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', appData.changePeriodAmount);

additionalExpensesItem.addEventListener('keydown', function(e){
    if(appData.checkString(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
additionalIncomeItem.forEach(function(item){
    item.addEventListener('keydown', function(e){
        if(appData.checkString(e.key) !== true){
            e.preventDefault();
            return false;
        }      
    });
});
document.querySelector('.data input.income-title').addEventListener('keydown', function(e){
    if(appData.checkString(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
document.querySelector('.data input.income-amount').addEventListener('keydown', function(e){
    if(appData.checkNumber(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
document.querySelector('.data input.expenses-amount').addEventListener('keydown', function(e){
    if(appData.checkNumber(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
document.querySelector('.data input.expenses-title').addEventListener('keydown', function(e){
    if(appData.checkString(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});

document.querySelector('.data input.target-amount').addEventListener('keydown', function(e){
    if(appData.checkNumber(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
/*
//спросим о расходах
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
console.log('какой доход мы получим за период ' + appData.period + ': ' + appData.calcPeriod());
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
