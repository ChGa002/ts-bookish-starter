export class User {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    token: string;

    constructor(id: number, name: string, surname: string, email: string, password: string, token: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.token = token;
    }

    static from_row(columns) {
        return new User(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5]);
    }
}
