import Student from "./classes/student.js";
import Human from "./classes/human.js";
import ListItem from "./classes/list-item.js";

import { Validator } from "./validators/validator.js";

function averageMark(mark) {
    let arrMarks = mark.split(" ");
    return arrMarks.reduce((a, b) => Number(a) + Number(b)) / arrMarks.length;
}

function SortAverageMarks(group) {
    group.sort(function (a, b) {
        return a.mark - b.mark;
    });
    return group;
}

class Teacher extends Human {
    constructor(info) {
        super(info);
        this.group = info.group;
    }
    getFullName(){
        return `Teacher - ${this.firstName} ${this.lastName}`;
    }
}

let group = [];
let teacher = new Teacher({
    firstName: "Riana",
    lastName: "Grande",
    id: Human.count,
    group: group,
});
let teacherName = document.getElementById("teacher-name");
teacherName.innerHTML = teacher.getFullName()

let humanContainer = document.getElementById("human-container");
const humanList = new ListItem(humanContainer);


const { isNotEmpty, isNumber, maxLength } = Validator.validators;

let formGroupConfig = {
    "first-name": [isNotEmpty, maxLength(16)],
    "last-name": [isNotEmpty, maxLength(20)],
    marks: [isNotEmpty, maxLength(29)],
};

function clearingErrors() {
    let form = document.querySelector("#human-form");
    Object.entries(formGroupConfig).forEach(([name]) => {
        let messageError = form.querySelector(`[data-for="${name}"]`);
        if (form.elements[name].classList.length != 0) {
            form.elements[name].classList.remove("error");
            messageError.innerHTML = Object.values({})
                .map(() => `<span></span>`)
                .join("");
            messageError.style.display = "none";
        }
    });
    return 0;
}


let btnAddStart = document.getElementById("btn-add-start");
let btnRemove = document.querySelector("#btn-remove");

btnRemove.onclick = function () {
    let id = Student.count--;
    group.pop();
    humanList.removeById(`${id}`);
    humanList.store.pop();
};

btnAddStart.onclick = function () {
    let form = document.querySelector("#human-form");
    const VALID = Validator.validate(formGroupConfig, form);

    if (!VALID) {
        clearingErrors();
        Object.entries(Validator.errors).forEach(([name, error]) => {
            let messageError = form.querySelector(`[data-for="${name}"]`);
            form.elements[name].classList.add("error");
            messageError.innerHTML = Object.values(error || {})
                .map((message) => `<span>${message}</span>`)
                .join("");
            messageError.style.display = "block";
        });
    } else {
        clearingErrors();
        let id = ++Student.count;
        let s = new Student({
            firstName: form.elements["first-name"].value,
            lastName: form.elements["last-name"].value,
            id,
            mark: averageMark(form.elements["marks"].value),
        });
        group.push(s);
        humanList.add(group[id-1]);
        group = SortAverageMarks(group)

        for (let i = group.length; i > 0 ; i--) {
            humanList.removeById(`${i}`);
            humanList.store.pop();
        }

        group.forEach(student => {
        humanList.add(student);
        });
    }
};
