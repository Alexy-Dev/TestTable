// Тестовое задание:
// Задание выполняется без использования фреймворков.
// Используется чистый JavaScrypt (без Jquery) и PHP
// 1. На странице создать таблицу из одних строчек.
// В каждой строчке некое произвольное слово.
// При нажатии на строчку без перегрузки страницы происходит открытие модального окна на весь экран.
// В модальном окне есть крестик, при нажатии на который происходит закрытие окна.
// 2. При вторичном открытии модального окна оно должно быть в исходном состоянии.
// В открытом модальном окне есть шапка таблицы, без тела таблицы.
// В шапке таблицы её название = тексту из нажатой ранее строчки.
// Есть кнопка Add row.
// При нажатии на нее в таблице появляется строка, в которой есть кнопка удаляющая эту строку, при нажатии которой строка пропадает.
// В строке есть поле ввода общего вида (не использовать type= « number»).
// На нечетной строке можно вводить целое положительное число больше нуля, на четной текст.
// Проверку проводить скриптом на чистом JavaScrypt.
// Внизу таблицы есть место, где выводится сумма введенных чисел.

// 3. Есть кнопка Save.
// При нажатии кнопки Save, без перегрузки страницы происходит запись данных в БД на сервере.
// Далее можно продолжать ввод данных, при вторичной записи текст в БД добавляется, а сумма чисел перезаписывается.

// 4. При вторичной загрузке исходной страницы в строчках ее таблицы должны вывестись введенные ранее в модальном окне слова и сумма введенных ранее чисел.
// Срок выполнения задания 2 дня. Те кто приступит к выполнению пожалуйста сообщите мне чтоб мы его ждали.

// Результат можно представить в одном из двух вариантов.
// Разместить на сервере и дать доступ к папке, либо прислать в виде файлов

window.addEventListener('DOMContentLoaded', () => {
    
    //Modal

    const modalTrigger = document.querySelectorAll('.btn'),  //обращаемся ко всем эллементам, которым мы назначили класс data-modal, если эл. один, то querySelector
          modal = document.querySelector('.modal'),          
          items = document.querySelectorAll('.btn-item span'),
          calc = document.querySelector('.calculating__result span'),
          titleModal = document.querySelector('.mod');        
          
          
          
          
        // titleModal.textContent.splice();
        //   console.log(calc.textContent);


    modalTrigger.forEach(items => {           //если одну и ту же модалку вызывают разные кнопки, помеченные нами data-modal, то псевдомассив перебираем forEach        
        items.addEventListener('click', (e) => {
            let item = e.target.closest('.btn'),      //прописываем логику отражения значения ячейки в заглавии открываемой таблицы
                content = e.target.textContent; // (1)
          
            if (!item) return; // (2)
          
            if (!items.contains(item)) return; // (3)
          
            titleModal.textContent = content;
            openModal(item); // (4)
            
          });
           
    });


    function openModal() {                  //засовываем алгоритм открывания в функцию
        modal.classList.add('show');   
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';    
    }

    function closeModal() {                 //засовываем алгоритм закрывания в функцию
        modal.classList.add('hide');
        modal.classList.remove('show');              
        document.body.style.overflow = '';
        formRow.classList.add('hide');
        addRow.classList.remove('hide');

    }

    modal.addEventListener('click',  (e) => {    //передаем аргумент события event(e)
        if (e.target === modal || e.target.getAttribute('data-close') == "") {          //добавляем второе условие e.target.getAttribute('data-close') == ""
            closeModal();                   //при выполнении условия вызываем функцию
        }    
    });

    document.addEventListener('keydown', (e) => {   //закрытие модалки по клавише клавиатуры
        if (e.code === "Escape" && modal.classList.contains('show')) {    //escape, и при открытой модалке
            closeModal();           
        }
    });


    //Add row
    
    const addRow = document.querySelector('.add__row'),
          formRow = document.querySelector('.form__row');
        

    addRow.addEventListener('click', () =>{        
        formRow.classList.remove('hide');
        formRow.classList.add('show');
        addRow.classList.add('hide');
    });
    

    
    //Table
  
    const rowDB = {      
        rows: [
            "STRING",
            "NUM",
            "WORD",
            "NUMBER"            
        ]
    };

    function loadRow(rowDB){
        const returnRowDB = JSON.parse(localStorage.getItem("rows"));
        if (localStorage.getItem("rows") == null) {
            rowDB;
        } else {
            rowDB.rows.splice(rowDB.rows);            
            rowDB.rows = returnRowDB;           
        }
    }
        loadRow(rowDB); 
    
    const tableList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = document.querySelector('.adding__input');
    
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();                     //метод не перезагружать страницу
    
        let myRow = addInput.value,
            myInput = addInput.type;

              
        if (myRow) {                        //проверка условия булеановым значением   
    
            if (myRow.length > 11) {       //добавляем в аргумент условие
                myRow = `${myRow.substring(0, 12)}...`;   //указываем интерполяцией что делать.
            }
            if ((rowDB.rows.length - 1) % 2 == 0) {     ////прописываем алгоритм назначения типа инпута
                myInput = 'number';
                addInput.placeholder = 'word';
            } else {
                myInput = 'text';
                addInput.placeholder = 'number';
            }
            if (myInput == 'number' && myRow.match(/\D/g)) {
                addInput.style.border = '1px solid red';
                addInput.placeholder = 'wright number';
                e.target.reset();
                return;                
            } else {
                addInput.style.border = '1px solid black';
            }
            if (myInput == 'text' && myRow.match(/\d/g)) {
                addInput.style.border = '1px solid red';
                addInput.placeholder = 'wright word';
                e.target.reset();
                return;
            } else {
                addInput.style.border = '1px solid black';
            }

            rowDB.rows.push(myRow);  //метод добавления в объект
            createRowsList(rowDB.rows, tableList);
            const serialRowDB = JSON.stringify(rowDB.rows);
            localStorage.setItem("rows", serialRowDB);
            sum();            
        }        
       
        e.target.reset();
        console.log(myInput);
        console.log(rowDB.rows.length);
    
    });
    
    function createRowsList(rows, parent) {
        parent.innerHTML = ""; //очистили форму
               
        rows.forEach((row, i) => { //даем название массиву и нумерацию списку
        parent.innerHTML += `
        <li data-modal class="promo__interactive-item btn-item">${i + 1} <span>${row}</span>
            <div class="delete">&times;</div>
        </li>
        `;
    });
    
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {               //навешиваем обработчик события
            btn.parentElement.remove();         //метод удаления родительского эллемента
            if (rowDB.rows.length > 1) {        //условие для остановки удаления при 1 оставшемся эллементе
            rowDB.rows.splice(i, 1);        //метод удаления из псевдомассива 
            }
            createRowsList(rows, parent); //рекурсией переписываем нумерацию, и заменяем аргументы на объявленные, чтобы отвязаться от эллементов.
            const serialRowDB = JSON.stringify(rowDB.rows);
            localStorage.setItem("rows", serialRowDB);
            sum();
            if (modal.classList.contains('show')) {
                modal.classList.remove('show');
                modal.classList.add('hide');
            }      
        });                                 
    });
    }
           
    createRowsList(rowDB.rows, tableList);

    //CALCULATOR
    // console.log(items);
    // console.log(rowDB.rows.length);
    

    function sum() {                                //засовываем алгоритм калькулятора в функцию
        const rows_nums = rowDB.rows.map(rows => {
        
        if (rows.match(/\D/g)) {    //если содержимое ячейки не число
            rows = 0;
        } else {
            rows = rows;
        }        
        return rows; 
        
        });
        console.log(rows_nums);

        calc.textContent = rows_nums.reduce((total, num) => +total + +num);
    }
    sum();
   
    // function getStaticInformation(selector) {            //получение данных со статичных объектов
    //     const elements = document.querySelectorAll(selector);

    //     elements.forEach(elem => {                          //перебираем массив, с целью избавиться от ошибок делегирования, которые распространяются на весь див

    //         elem.addEventListener('click', (e) => {
    //             if (e.target.getAttribute('num')) {
    //                 name = +e.target.getAttribute('num');   
    //                 localStorage.setItem('name', +e.target.getAttribute('num'));    //запись данных в локальное хранилище
    //             }  else {
    //                 name = e.target.getAttribute('id');            //обращаемся к уникальному 'id'
    //                 localStorage.setItem('name', +e.target.getAttribute('id'));             //запись данных в локальное хранилище
    //             }    
  
    //             elements.forEach(e => {
               
    //             if (e.target.id === 'num') {
    //                 result.textContent = ++input.value;                    
    //             } 
    //             if (e.target.id === 'name') {
    //                 result.textContent;                    
    //             }                 
                  
    //         });

    //         calcTotal();

    //     });

    //     }

    // getStaticInformation('#name');    

    // function getDynamicInformation(selector) {
    //     const input = document.querySelector(selector);

    //     input.addEventListener('input', () => {
    //         if (input.value.match(/\D/g)) {     //если содержимое инпута не число
    //             input.style.border = '1px solid red';  //добавляем инлайн стили
    //         } else {
    //             input.style.border = 'none';                              
    //         }
    //         switch(input.getAttribute('id')) {
    //             case 'str':
    //                 str = +this.input.value;
    //                 break;
    //             case 'num':
    //                 num = +this.input.value;
    //                 break;
    //         } 
    //         calcTotal();        
    //     });        
    // } 
    // getDynamicInformation('rows'); 

    
//     let a = [];
// a[0] = "a";
// a[10] = "b";
// a[10000] = "c";
// for (let key in a) {
//     if (/^0$|^[1-9]\d*$/.test(key) &&
//         key >= 0) {
//         console.log(a[key]);
//     }
// }
});