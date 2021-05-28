export default class Human {
    static count = 0;
    constructor({ firstName, lastName, id }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
    }
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}