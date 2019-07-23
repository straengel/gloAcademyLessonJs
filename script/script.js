'use strict';
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
const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
    additionalExpenses = document.querySelector('.additional-expenses'),
    periodSelect = document.querySelector('.period-select'), //ползунок
    periodAmount = document.querySelector('.period-amount'), //цифирка под ползунком
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    depositCheck = document.querySelector('#deposit-check'),
    dipositBank = document.querySelector('.deposit-bank'),
    dispoitAmount = document.querySelector('.deposit-amount'),
    dispoitPercent = document.querySelector('.deposit-percent');
    
let incomeItems = document.querySelectorAll('.income-items'), //Цели
    expensesItems = document.querySelectorAll('.expenses-items'), //обяхательные расходы
    dataInputs; //а надо ли

class appData{

    //конструктор
    constructor(){
        this.budget = 0; //просто бюджет
        this.budgetDay = 0; //дневной доход
        this.budgetMonth = 0; //месячный доход
        this.income = {}; //ДОПОЛНИТЕЛЬНЫЙ ЗАРАБОТОК
        this.addIncome = []; //ДОПОЛНИТЕЛЬНЫЙ ДОХОД
        this.incomeMonth = 0; //ДОПОЛНИТЕЛЬНЫЙ ДОХОД в месяц
        this.expenses = {}; //записываем название и стоимость ОБЯЗАТЕЛЬНЫХ РАСХОДОВ
        this.expensesMonth = 0; //считаем расходы за месяц
        this.addExpenses = []; //Возмодные расходы
        this.deposit = false; //Дипозит
        this.percentDeposit = 0; // Процент за депозита
        this.moneyDeposit = 0; //Деньги на дипозитном счету
        //запустим 
        //this.start();
    }

    //запуск
    start() {
        if(salaryAmount.value === ''){
            start.setAttribute('disabled', true);
            return;
        } 
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses(); //переписать 
        this.getAddIncome(); //переписать
        this.getBudget();

        this.showResult();
        /**
         * 6) Блокировать все input[type=text] с левой стороны 
         * после нажатия кнопки рассчитать, 
         * после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить (есть в верстке) 
         * на кнопку сбросить пока ничего не навешиваем
         */
        let dataInputs = document.querySelectorAll('.data input[type=text]');
        dataInputs.forEach((item) => {
            item.setAttribute('disabled', true);
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
    }

    //сброс
    reset(){
        //Сбросим  все инпуты по правой стороне
        document.querySelectorAll('.result input[type=text]').forEach((item) => {
            item.value = '';
        });
        //разблокируем все инпуты по левой стороне и сбрасываем значения
        dataInputs = document.querySelectorAll('.data input[type=text]');
        dataInputs.forEach((item) => {
            item.removeAttribute('disabled');
            item.value = '';
        });
        this.deleteExpensesBlock();
        this.deleteIncomeBlock();
        //удаление checked
        depositCheck.checked = false;
        //Сбрасываем период и полоску
        periodSelect.value = 1;
        this.changePeriodAmount();
        
        start.style.display = 'block';
        cancel.style.display = 'none';
    }

    //показать результат
    showResult(){
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
    }

    //Получить Дополнительный доход или расход, смотря что надо 
    //из функций getAddExpenses getAddIncome
    //перепись
    getAddExpenses(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== ''){
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome(){
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }

    //считаем бюджет budgetDay и budgetMonth
    getBudget () {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth/30;
    }

    //Дополнительный доход добавляем блоки при нажатии на плюсик
    addIncomeBlock(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        document.querySelectorAll('.income-items').forEach((item) => {
            item.querySelector('.income-amount').addEventListener('keydown', (e) => {
                if(this.checkNumber(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
            item.querySelector('.income-title').addEventListener('keydown', (e) => {
                if(this.checkString(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
        });

        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3)
            incomePlus.style.display = 'none';
    }

    //Обязательные расходы добавляем блоки при нажатии на плюсик
    addExpensesBlock(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        document.querySelectorAll('.expenses-items').forEach((item) => {
            item.querySelector('.expenses-amount').addEventListener('keydown', (e) => {
                if(this.checkNumber(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
            item.querySelector('.expenses-title').addEventListener('keydown', (e) => {
                if(this.checkString(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
        });

        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    }

    //Дополнительный доход добавляем блоки при нажатии на плюсик
    deleteIncomeBlock(){
        document.querySelectorAll('.income-items').forEach(function(item,i){
            if(i === 0) return;
            item.remove();
        });
        incomePlus.style.display = 'block';
    }

    //Обязательные расходы добавляем блоки при нажатии на плюсик
    deleteExpensesBlock(){
        document.querySelectorAll('.expenses-items').forEach(function(item,i){
            if(i === 0) {return};
            item.remove();
        });
        expensesPlus.style.display = 'block';
    }

    //Дополнительный доход получаем данные и записываем в income
    getIncome(){
        incomeItems.forEach((items) => {
            let itemIncome = items.querySelector('.income-title').value;
            let cashIncome = items.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = +cashIncome;
                this.incomeMonth += +cashIncome;
            }
        });        
    }

    //Обязательные расходы получаем данные и записываем в expenses
    getExpenses(){
        expensesItems.forEach((items) => {
            let itemExpenses = items.querySelector('.expenses-title').value;
            let cashExpenses = items.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    //Считаем все обязательные расходы и кладем в expensesMonth
    getExpensesMonth (){
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
    }

    //Считаем за сколько достигнем цели
    getTargetMonth () {
        return targetAmount.value / this.budgetMonth;
    }

    //Выводим статус
    getStatusIncome () {
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

    //добавить данный о дипозите
    getInfoDeposit(){
        this.deposit = confirm('Есть ли у вас депозит в банке?'); 
        if(this.deposit){
            this.percentDeposit = isNumber(prompt('Какой годовой процент?', 10));
            this.moneyDeposit = isNumber(prompt('Какая сумма заложена?', 10000));
        }
    }

    //какой доход мы получим за период
    calcPeriod(){
        return this.budgetMonth * periodSelect.value;
    }

    //изменение цифирки
    changePeriodAmount(){
        periodAmount.textContent = periodSelect.value;
    }

    /** Hard
     *  Поля с placeholder="Наименование" разрешить ввод только русских
     *  букв пробелов и знаков препинания
     */
    checkNumber(num){
        let regexp = /[0-9]/i;
        if(regexp.test(num))
            return true;
        else
            return false;
    }

    checkString(str){
        let regexp = /[a-яА-Я,\s]/i;
        regexp = /[А-яё/B]/i;
        if(regexp.test(str) || str == ',' || str == '.' || str == '!' || str == '-' || str == '_' || str == '/' || str == ' '){
            return true;
        } else {
            return false;
        }
    }


    /**
     * Создать новый метод в классе, например eventsListeners. 
     * Перенести все действия, которые остались за классом внутрь него. 
     */
    eventsListeners(){
        
        //start.addEventListener('click', appData.start);
        start.addEventListener('click', this.start.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('change', this.changePeriodAmount);

        additionalExpensesItem.addEventListener('keydown', (e) => {
            if(this.checkString(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });

        salaryAmount.addEventListener('keydown', (e) => {
            if(this.value !== '')
                start.removeAttribute('disabled');
            else
                start.setAttribute('disabled', true);
        
            if(this.checkNumber(e.key) !== true){
                e.preventDefault();
                return false;
            }        
        });

        
        additionalIncomeItem.forEach((item) => {
            item.addEventListener('keydown', (e) => {
                if(this.checkString(e.key) !== true){
                    e.preventDefault();
                    return false;
                }      
            });
        });

        depositCheck.addEventListener('check', () => {
            if(depositCheck.checked){
                depositBank.style.display = 'inline-block';
                dipositAmount.style.display = 'inline-block';
                this.deposit = 'true';
            } else {
                depositBank.style.display = 'none';
                dipositAmount.style.display = 'none';
                dipositAmount.value = '';
                this.deposit = 'true';
            }
        });

        document.querySelector('.data input.income-title').addEventListener('keydown', (e) => {
            if(this.checkString(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });
        document.querySelector('.data input.income-amount').addEventListener('keydown', (e) => {
            if(this.checkNumber(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });
        document.querySelector('.data input.expenses-amount').addEventListener('keydown', (e) => {
            if(this.checkNumber(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });
        document.querySelector('.data input.expenses-title').addEventListener('keydown', (e) => {
            if(this.checkString(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });
        document.querySelector('.data input.target-amount').addEventListener('keydown', (e) => {
            if(this.checkNumber(e.key) !== true){
                e.preventDefault();
                return false;
            }      
        });
    }
}

const ob = new appData();
//ob.start();
ob.eventsListeners();
