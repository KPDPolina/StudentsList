import Human from "./human.js"

export default class Student extends Human {
    static count = 0;
    constructor(info) {
        super(info);
        this.mark = info.mark;
    }
    
}