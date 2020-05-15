// CODE EXPLAINED channel

// Выбераем элементы
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const todoButton = document.querySelector("#btn");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Переменные
let LIST, id;

// Получить элемент из переменной
let data = localStorage.getItem("TODO");

// Проверить не пустое ли поле ввода
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // установить идентификатор до последнего в списке
    loadList(LIST); // выводим задачи в список
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// выводим задачи в список
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// Очистить локальное хранилище
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// Показываем сегоднешнею дату
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("RU", options);

// функции для вывода задач

function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// добовлять задачи в список при помощи клавиши ENTER
document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // Если поле ввода не пустое
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            //сохранять данные передаем объект LIST. setItem - создавать новое значение в localStorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// отмечаем галочкой сделанные задачи
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Удаляем задачи
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

