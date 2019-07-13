'use strict';
//Восстановить порядок книг.
let books = document.querySelectorAll('.books'),
    listBooks = document.querySelectorAll('.book');

books[0].insertBefore(listBooks[1], listBooks[0]);
books[0].appendChild(listBooks[2]);
books[0].insertBefore(listBooks[4], listBooks[3]);
//Заменить картинку заднего фона на другую из папки image
document.querySelector('body').style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
listBooks[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
document.querySelector('.adv').remove();

//Восстановить порядок глав во второй и пятой книге
let bookChapter,
    bookChapterList;
bookChapter = listBooks[0].querySelector('ul');
bookChapterList = listBooks[0].querySelectorAll('ul li');
bookChapter.insertBefore(bookChapterList[2], bookChapterList[10]);
bookChapter.insertBefore(bookChapterList[7], bookChapterList[9]);
bookChapter.insertBefore(bookChapterList[6], bookChapterList[4]);
bookChapter.insertBefore(bookChapterList[8], bookChapterList[4]);


bookChapter = listBooks[5].querySelector('ul');
bookChapterList = listBooks[5].querySelectorAll('ul li');
bookChapter.insertBefore(bookChapterList[2], bookChapterList[5]);
bookChapter.insertBefore(bookChapterList[9], bookChapterList[3]);
bookChapter.insertBefore(bookChapterList[5], bookChapterList[10]);
bookChapter.insertBefore(bookChapterList[8], bookChapterList[10]);

//в шестой книге добавить главу 
//“Глава 8: За пределами ES6” и поставить её в правильное место
let el = document.createElement('li');
el.textContent= 'Глава 8: За пределами ES6';
bookChapter = listBooks[2].querySelector('ul');
bookChapter.appendChild(el);
bookChapterList = listBooks[2].querySelectorAll('ul li');
bookChapter.appendChild(bookChapterList[9]);
