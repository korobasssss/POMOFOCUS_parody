// класс для каждого из трех помодоро, для удобства обновления информации
class DataPomodoro {

    constructor(pomodoro, on, time) {
        this.pomodoro = pomodoro;
        this.on = on;
        this.time = time;
        this.curr_tasks = [];
        this.finished_tasks = [];

    }

    chose_pomodoro() {

        if (this.on == true) {
            this.pomodoro.style.cssText = "background-color: rgba(121, 139, 68, 1); border-radius: 15px; padding: 5% 7% 5% 7%; font-weight: 600;";
    
        } else {
            this.pomodoro.style.cssText = "background-color: rgba(146, 168, 84, 1); font-weight: 200;";
        }
    }



    getPomodoro() {
        return this.pomodoro;
    }
    getOn() {
        return this.on;
    }
    getTime() {
        return this.time;
    }
    getMinutes() {
        return this.time[0];
    }
    getSeconds() {
        return this.time[1];
    }
    getCurrTasks() {
        return this.curr_tasks;
    }
    getFinishedTasks() {
        return this.finished_tasks;
    }

    
    setOn(on) {
        this.on = on;
    }
    setTime(time) {
        this.time = time;
    }
    setMinutes(min) {
        this.time[0] = min;
    }
    setSeconds(sec) {
        this.time[1] = sec;
    }
    setCurrTask(task) {
        this.curr_tasks.push(task);
    }
    setFinishedTask(task) {
        this.finished_tasks.push(task);
    }

    clear_curr_tasks() {
        this.curr_tasks = [];
    }
    clear_finished_tasks() {
        this.finished_tasks = [];
    }

}



var pomodoro = new DataPomodoro(document.getElementById("button_nav_pomodoro"), true, [25, 0]);
pomodoro.chose_pomodoro();
var short_break = new DataPomodoro(document.getElementById("button_nav_short_break"), false, [5, 0]);
short_break.chose_pomodoro();
var long_break = new DataPomodoro(document.getElementById("button_nav_long_break"), false, [15, 0]);
long_break.chose_pomodoro();

var array_nav = [
                    pomodoro,
                    short_break, 
                    long_break
                ];
var curr_index = 0;

var time = document.getElementById("time"); // время таймера
var minute = array_nav[curr_index].getMinutes();
var second = array_nav[curr_index].getSeconds();
change_time();

function change_time() {
    var time_str = "";

    minute = array_nav[curr_index].getMinutes();
    second = array_nav[curr_index].getSeconds();

    time_str = make_string_time(minute) + ":" + make_string_time(second);

    time.innerHTML = time_str;
}

function make_string_time(timee) {
    timee = "" + timee;

    if (timee.length == 1) {
        timee = "0" + timee;
    }

    return timee;
}

function Butter__time_navClick(element) {

    if (timer) {
        clear_timer();
    }

    for (var i = 0; i < array_nav.length; i++) {
        if (element == array_nav[i].getPomodoro()) {
            array_nav[i].setOn(true);
            curr_index = i;
        } else {
            array_nav[i].setOn(false);
        }

        array_nav[i].chose_pomodoro();
        change_time();
    }
}

function clear_timer() {
    clearInterval(timer);
    stop_button.style.display = "none";
    pause_button.textContent = "PAUSE";
    pause_button.style.display = "none";
    start_button.style.display = "grid";
    butons_area.style.cssText = "grid-template-columns: auto; justify-content: center;"
}


// работа с таймером;
var timer;
var butons_area = document.getElementById("button_start_stop_pause");
var start_button = document.getElementById("start_button"); 
var stop_button = document.getElementById("stop_button"); 
var pause_button = document.getElementById("pause_button"); 

function start_timer() {

    console.log(minute, second);

    timer = setInterval(timer_func, 1000);

    start_button.style.display = "none";
    //добавление кнопок паузы и стопа
    butons_area.style.cssText = "grid-template-columns: 30% 30%; column-gap: 10%; justify-items: stretch; justify-content: center;"
    stop_button.style.display = "grid";
    pause_button.style.display = "grid";
}

function stop_timer() {
    clear_timer();
    change_time();
}

function pause_timer() {
    if (pause_button.textContent == "PAUSE") {
        clearInterval(timer);
        pause_button.textContent = "GO ON";
    } else {
        timer = setInterval(timer_func, 1000);
        pause_button.textContent = "PAUSE";
    }
    

    

}



function timer_func() {
    if (minute == 0 && second == 0) {
        stop_timer();
    } else if (second == 0){
        second = 59;
        minute--;
    } else {
        second--;
    }
    
    console.log(minute);


    time.innerHTML = make_string_time(minute) + ":" + make_string_time(second);
    console.log(make_string_time(minute) + ":" + make_string_time(second));
}

function change_pomodoro_count(count) {
    if (count.value != '') {
        minute = array_nav[curr_index].getMinutes() * Number(count.value);
    time.innerHTML = make_string_time(minute) + ":" + make_string_time(second);
    }
}

function plus_time() {
    minute++;
    time.innerHTML = make_string_time(minute) + ":" + make_string_time(second);
}

function minus_time() {
    if (minute - 1 > 0) {
        minute--;
        time.innerHTML = make_string_time(minute) + ":" + make_string_time(second);
    }
    
}



// создание новых задач
var flag_one_edit = true; // булевский флаг, который позволяет редактировать только одну задачу (несколько однвременно нельзя)
var new_task_form = document.getElementById('new_task');
var button_add_task = document.getElementById('add_task');

var textarea = document.getElementById("textarea_new_task");
textarea.addEventListener("input", function() { // высота рассчитывается при каждом изменении textarea
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});

var curr_tasks = document.getElementById("curr_tasks");


function open_new_task_form() {
    new_task_form.style.display = 'grid';
    button_add_task.style.display = 'none';
    // open_task_window.style.cssText = "align-items: center; justify-items: center; grid-template-rows: 10% 50% 10%;";
}

function close_new_task_form() {
    
    if( textarea.value != '' ) {
        new_task_form.style.display = 'none';
        button_add_task.style.display = 'grid';


        array_nav[curr_index].setCurrTask(textarea.value);

        el_list = document.createElement('li');
        el_list.classList.add("finish_task");
        el_list.innerHTML =     '<button class="button_finish_task" onclick="finish_task(this)">&#10003;</button>' +
                                '<p class="task_text"></p>' +
                                '<button class="button_edit_task" onclick="edit_task(this)">&#9998;</button>' +
                                '<button class="button_delete_task" onclick="delete_task(this)">&#10006;</button>';
        children_el_list = el_list.children;
        console.log( children_el_list[1]);

        children_el_list[1].innerHTML = textarea.value;
                            
        textarea.value = "";

        console.log(textarea.value);
        curr_tasks.appendChild(el_list);
    }
}

var text; // в этой переменной будет храниться параграф с текстом для задачи

function finish_task(element) {
    if (flag_one_edit) {
        element.style.color = "rgba(82, 94, 49, 1)";
        var parent = element.parentNode;

        console.log(parent);
        var parent = element.parentNode;
        var text_el = parent.children;
        text = text_el[1]; // получаем наш параграф с задачей
        text_el[1].style.cssText = "text-decoration: line-through;";   
    }
    
}

function edit_task(element) {
    if (flag_one_edit) {
        flag_one_edit = false;
        var parent = element.parentNode;
        var text_el = parent.children;
        console.log(text_el[1]);
        text = text_el[1]; // получаем наш параграф с задачей
        text_el[1].innerHTML = '<textarea class="input_new_task" id="edit_task" type="text">' + text.textContent + '</textarea>' +  
                                '<button class="button_save_edit_task" onclick="change_task_name(this)">SAVE</button>';
    }
    
}

function change_task_name(element) {
    flag_one_edit = true;
    var parent = element.parentNode;
    var text_el = parent.children;
    var text = text_el[0];
    console.log(text_el);
    if (text.value != '') {
        parent.innerHTML = text.value;
    }
    
}

function delete_task(element) {
    if (flag_one_edit) {
        var parent = element.parentNode;
        var parent_parent = parent.parentNode;
        parent_parent.remove();
    }

}