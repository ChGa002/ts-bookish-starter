const { Model, DataTypes } = require('sequelize');
import bookishDb from '../databaseConfig';

export class User extends Model {
    otherPublicField;
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { sequelize: bookishDb },
);

/*
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
*/
