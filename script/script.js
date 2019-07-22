'use strict';

const cityArr = {
    rus: ['Москва', 'Санк-Петербург', 'Новосибирск', 'Екатеринбург', 'Нижний Новгород', 'Казань', 'Челябинск'],
    uk: ['Киев', 'Харьков', 'Одесса', 'Днепр', 'Донецк', 'Запорожье', 'Львов'],
    bel: ['Минск', 'Гомель', 'Могилёв', 'Витебск', 'Гродно', 'Брест'],
    jap: ['Токио', 'Киото', 'Осака', 'Иокогама'] 
}

let city = document.querySelector('#city');
let country = document.querySelector('#country');

country.addEventListener('change', (e)=>{
    let options = document.querySelector('#city');
    if(options.querySelector('option') !== null)
        options.innerHTML = "";
    cityArr[e.target.value].forEach((element, i) => {
        let option = document.createElement("option");
        option.value = element;
        option.text = element;
        options.appendChild(option);
    });
    options.style.display = 'inline-block';
});
city.addEventListener('change', (e)=>{
    document.querySelector('.result').textContent = 
        String(country.options[country.options.selectedIndex].text) 
        + ', ' 
        + String(e.target.value)
});
