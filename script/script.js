'use strict';
const calculator = {
    sum: function(){
      console.log(document.querySelector('#a').value + document.querySelector('#b').value);
      this.show().value = Number(document.querySelector('#a').value) + Number(document.querySelector('#b').value);
    },
    mult: function(){
      console.log(document.querySelector('#a').value / document.querySelector('#b').value);
      this.show().value = document.querySelector('#a').value / document.querySelector('#b').value;
    },
    show: function(){
      return document.querySelector('#res');
    }
  }
  document.querySelector('#sum').addEventListener('click', calculator.sum.bind(calculator));
  document.querySelector('#mult').addEventListener('click', calculator.mult.bind(calculator));