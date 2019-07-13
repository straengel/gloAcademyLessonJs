'use strict';
//Получить кнопку "Рассчитать" через id
let buttonStart = document.getElementById('start');
console.log();
//Получить кнопки “+” (плюс) через Tag, каждую в своей переменной. 
let buttonPluses, buttonPlusFirst, buttonPlusSecond;
buttonPluses = document.getElementsByTagName('button');
buttonPlusFirst = buttonPluses[0];
buttonPlusSecond = buttonPluses[1];
console.log(buttonPlusFirst);
console.log(buttonPlusSecond);

//получить чекбокс по id через querySelector
let checkbox = document.querySelector('#deposit-check');
console.log(checkbox);

//Получить поля для ввода возможных доходов (additional_income-item) 
//при помощи querySelectorAll
let additional = document.querySelectorAll('.additional_income-item');
console.log(additional);

//Получить все блоки в правой части программы через классы 
//(которые имеют класс название-value, 
//начиная с class="budget_day-value" и заканчивая class="target_month-value">)
let rightBlock = document.querySelectorAll('.result-total');
console.log(rightBlock);

//Получить оставшиеся поля через querySelector 
//каждый в отдельную переменную (Инпуты с левой стороны не забудьте про range)
//Месячный доход*
let salaryAmount = document.querySelector('input.salary-amount');
console.log(salaryAmount);

//Дополнительный доход
let incomeF = document.querySelector('input.income-title');
console.log(incomeF);
let incomeS = document.querySelector('input.income-amount');
console.log(incomeS);

//Обязательные расходы
let expensesF = document.querySelector('input.expenses-title');
console.log(expensesF);
let expensesS = document.querySelector('input.expenses-amount');
console.log(expensesS);

//Возможные расходы (перечислите через запятую)
let additionalExpenses = document.querySelector('input.additional_expenses-item');
console.log(additionalExpenses);

//Цель
let target = document.querySelector('input.target-amount');
console.log(target);

//Период расчета
let period = document.querySelector('input.period-select');
console.log(period);
