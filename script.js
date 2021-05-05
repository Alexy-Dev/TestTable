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
          items = document.querySelectorAll('.btn-item'),
          calc = document.querySelector('.calculating__result span'),
          titleModal = document.querySelector('.mod');        
          
          
          
          
        // titleModal.textContent.splice();
          console.log(calc.textContent);


    modalTrigger.forEach(items => {           //если одну и ту же модалку вызывают разные кнопки, помеченные нами data-modal, то псевдомассив перебираем forEach        
        items.addEventListener('click', (e) => {
            let item = e.target.closest('.btn'),
                content = e.target.textContent; // (1)
          
            if (!item) return; // (2)
          
            if (!items.contains(item)) return; // (3)
          
            titleModal.textContent = content;
            openModal(item); // (4)
            
          });
           
    });


    function openModal() {                  //чтобы не повторяться, засовываем алгоритм открывания в функцию
        modal.classList.add('show');   
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // console.log(this.items.target.value);    
    }

    function closeModal() {                 //чтобы не повторяться, засовываем алгоритм закрывания в функцию
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
    
        let myRow = addInput.value;

        // if (id.item % 2 == 0) {
        //     inputAdd.type = 'number';
        // }
            
        if (myRow) {                        //проверка условия булеановым значением   
    
            if (myRow.length > 11) {       //добавляем в аргумент условие
                myRow = `${myRow.substring(0, 12)}...`;   //указываем интерполяцией что делать.
            }

            rowDB.rows.push(myRow);  //метод добавления в объект
            createRowsList(rowDB.rows, tableList);
            const serialRowDB = JSON.stringify(rowDB.rows);
            localStorage.setItem("rows", serialRowDB);            
        }        
       
        e.target.reset();
    
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
            rowDB.rows.splice(i, 1);        //метод удаления из псевдомассива
            createRowsList(rows, parent); //рекурсией переписываем нумерацию, и заменяем аргументы на объявленные, чтобы отвязаться от эллементов.
            const serialRowDB = JSON.stringify(rowDB.rows);
            localStorage.setItem("rows", serialRowDB);
            if (modal.classList.contains('show')) {
                modal.classList.remove('show');
                modal.classList.add('hide');
            }      
        });                                 
    });
    }
           
    createRowsList(rowDB.rows, tableList);
    
    // function titleContent() {
    //     //   let item = this.items.value;
    //     items.forEach(i => {
    //           i.addEventListener('submit', () => {
    //             titleModal.textContent.remove();
    //             // e.titleModal.textContent = i.items.textContent;
    //             // e.titleModal.textContent = item.textContent.value; 
                

    //           });
    //           console.log(titleModal.textContent);

    //       });
                       
    //   }
    //   titleContent();
    console.log(titleModal.textContent);

    
    

   
    // localStorage

    // const result = document.querySelector('.calculating__result span'),
    //       inputValue = document.querySelector('addInput');

    //       let name = addInput.value;
    
    //       if (localStorage.getItem('name')) {               //работа с локальным хранилищем
    //         name = localStorage.getItem('name'); 
    //         } else {
    //         name = 'num';
    //         localStorage.setItem('name', 'num');
    //         }

            
    //         function initLocalSettings(selector){
    //             const elements = document.querySelectorAll(selector);

    //             elements.forEach(elem => {
    //                 elem.classList.remove(activeClass);
    //                 if (elem.getAttribute('id') === localStorage.getItem('name')) {
    //                     elem.classList.add(table.item);
    //                 }
                   
    //             });
    //         }
      
    // initLocalSettings('#name');
    // initLocalSettings('#id');

   
    //CALCULATOR
    
    //const nums = [29.76, 41.85, 46.5];
    // const sum = nums.reduce((total, amount) => total + amount); 
    // console.log(sum) // 118.11


    // function calcTotal() {
    //     if (name === 'str') {
    //         result.textContent;
    //     } if (name === 'num') {
    //         result.textContent = ++addInput.value;
    //     }
    // }
    // calcTotal(i = 0);

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

});