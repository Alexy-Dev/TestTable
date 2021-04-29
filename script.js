window.addEventListener('DOMContentLoaded', () => {
    
    //Modal

    const modalTrigger = document.querySelectorAll('.btn'),  //обращаемся ко всем эллементам, которым мы назначили класс data-modal, если эл. один, то querySelector
        modal = document.querySelector('.modal');

    modalTrigger.forEach(item => {           //если однe и тe же модалку вызывают разные кнопки, помеченные нами data-modal, то псевдомассив перебираем forEach
    item.addEventListener('click', openModal);
    });

    function closeModal() {                 //чтобы не повторяться, засовываем алгоритм закрывания в функцию
        modal.classList.add('hide');
        modal.classList.remove('show');              
        document.body.style.overflow = '';
        formRow.classList.add('hide');
        addRow.classList.remove('hide');

    }

    function openModal() {                  //чтобы не повторяться, засовываем алгоритм открывания в функцию
        modal.classList.add('show');   
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';    
    }

    modal.addEventListener('click',  (e) => {    //не забываем передавать аргумент события event(e)
        if (e.target === modal || e.target.getAttribute('data-close') == "") {          //добавляем второе условие e.target.getAttribute('data-close') == ''
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
    // const returnRowDB = JSON.parse(localStorage.getItem("name"));
    // console.log(returnRowDB);
    const rowDB = {      
        rows: [
            "STRING",
            "NUM",
            "WORD",
            "NUMBER"            
        ]
    };

    function loadRow(rowDB){
        const returnRowDB = JSON.parse(localStorage.getItem("name"));
        if (localStorage.getItem("name") != []) {
            // rowDB.rows = [returnRowDB];
            // rowDB.rows.splice(rowDB.rows);
            rowDB.rows.push(returnRowDB);  //метод добавления в объект
            console.log(rowDB);
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
            const serialRowDB = JSON.stringify(rowDB);
            localStorage.setItem("name", serialRowDB);   
        }        
       
        e.target.reset();
    
    });
    
    function createRowsList(rows, parent) {
        parent.innerHTML = ""; //очистили форму
               
        rows.forEach((row, i) => { //даем название массиву и нумерацию списку
        parent.innerHTML += `
        <li class="promo__interactive-item btn">${i + 1} ${row}
           <div class="delete">&times;</div>
        </li>`;
    });
    
    document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {               //навешиваем обработчик события
            btn.parentElement.remove();         //метод удаления родительского эллемента
            rowDB.rows.splice(i, 1);        //метод удаления из псевдомассива
            createRowsList(rows, parent); //рекурсией переписываем нумерацию, и заменяем аргументы на объявленные, чтобы отвязаться от эллементов.
            const serialRowDB = JSON.stringify(rowDB);
            localStorage.setItem("name", serialRowDB); 
        });                                 
    });
    }
           
    createRowsList(rowDB.rows, tableList);
    
   
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