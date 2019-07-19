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
        console.log(this);
        if(salaryAmount.value === ''){
            start.setAttribute('disabled', true);
            return;
        } 
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
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
    reset: function(){
        //Сбросим  все инпуты по правой стороне
        document.querySelectorAll('.result input[type=text]').forEach(function(item){
            item.value = '';
        });
        //разблокируем все инпуты по левой стороне и сбрасываем значения
        dataInputs = document.querySelectorAll('.data input[type=text]');
        dataInputs.forEach(function(item){
            item.removeAttribute('disabled');
            item.value = '';
        });
        this.deleteExpensesBlock();
        this.deleteIncomeBlock();
        //удаление checked
        depositCheck.removeAttribute('checked');
        //Сбрасываем период и полоску
        periodSelect.value = 1;
        this.changePeriodAmount();
        
        start.style.display = 'block';
        cancel.style.display = 'none';
        
    },
    showResult: function(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        //5) Добавить обработчик события внутри метода showResult, 
        //который будет отслеживать период и сразу менять значение в поле “Накопления за период”
        //ну он не будет отслеживать вот прям так
        periodSelect.addEventListener('change', this.calcPeriod);
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
        this.budgetMonth = this.budget + appData.incomeMonth - appData.expensesMonth;
        this.budgetDay = this.budgetMonth/30;
    },
    //Дополнительный доход добавляем блоки при нажатии на плюсик
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach(function(item){
            item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        document.querySelectorAll('.income-items').forEach(function(item){
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
    //Обязательные расходы добавляем блоки при нажатии на плюсик
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
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
    //Дополнительный доход добавляем блоки при нажатии на плюсик
    deleteIncomeBlock: function(){
        document.querySelectorAll('.income-items').forEach(function(item,i){
            if(i === 0) return;
            item.remove();
        });
        incomePlus.style.display = 'block';
    },
    //Обязательные расходы добавляем блоки при нажатии на плюсик
    deleteExpensesBlock: function(){
        document.querySelectorAll('.expenses-items').forEach(function(item,i){
            if(i === 0) return;
            item.remove();
        });
        expensesPlus.style.display = 'block';
    },
    //Дополнительный доход получаем данные и записываем в income
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
    //Обязательные расходы получаем данные и записываем в expenses
    getExpenses: function(){
        expensesItems.forEach(function(items){
            let itemExpenses = items.querySelector('.expenses-title').value;
            let cashExpenses = items.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    //Считаем все обязательные расходы и кладем в expensesMonth
    getExpensesMonth : function(){
        let sum = 0;
        for (let key in this.expenses) {
            sum += isNumber(this.expenses[key]);
        }
        if(this.income.length>0){
            for (let key in this.income) {
                sum += isNumber(this.expenses[key]);
            }
        }
        this.expensesMonth = isNumber(sum);
        //return isNumber(sum);
    },
    //Считаем за сколько достигнем цели
    getTargetMonth : function() {
        return targetAmount.value / appData.budgetMonth;
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
    },
    //добавить данный о дипозите
    getInfoDeposit: function(){
        this.deposit = confirm('Есть ли у вас депозит в банке?'); 
        if(this.deposit){
            this.percentDeposit = isNumber(prompt('Какой годовой процент?', 10));
            this.moneyDeposit = isNumber(prompt('Какая сумма заложена?', 10000));
        }
    },
    //какой доход мы получим за период
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
    },
    //изменение цифирки
    changePeriodAmount: function(){
        periodAmount.textContent = periodSelect.value;
    },
    /** Hard
     *  Поля с placeholder="Наименование" разрешить ввод только русских
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
//а нифига не понятно
function bind(func, context){
    return function() {
      return func.apply(context, arguments);
    };
}
//start.addEventListener('click', appData.start);
start.addEventListener('click', bind(appData.start, appData));
cancel.addEventListener('click', bind(appData.reset, appData));

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
/**
 * 3 правила this
 * 1. Привязка по умолчанию foo() в  this будет объект window
 * 2. не явная привязка obj.foo() в  this будет объект obj
 * 3. Явная привязка нужна для того, чтобы использовать конкретный объект при вызове функции
 * apply - принимает массив аргументов, которые будут разобраны и переданы в функцию, которую вызываем
 * call - принимает сколько угодно параметров через запятую
 * оба метода первым параметром принимает объект тот, 
 * который мы хотим привязать к контексту вызова this
 * 4. Привязка new
 let obj = {
     x: 10,
     y: 15
 }
 function newTest(){
     console.log('this: ', this)
 }
 newTest.apply(obj);
 newTest.call(obj);
 */
/**
 * Есть трюк жесткая привязка, когда внутри фнукции вызываем жесткую привязку
 * function hardBind(hard){
 *  newTest.call(herd)
 * } 
 * setTimeout(hardBind, 500, obj);
 * выведиться obj в консоли
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
/**/
/*
* пример блокировки
additionalExpensesItem.addEventListener('keydown', function(e){
    if(appData.checkString(e.key) !== true){
        e.preventDefault();
        return false;
    }      
});
//*/