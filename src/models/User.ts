const { Model, DataTypes } = require('sequelize');
import bookishDb from '../databaseConfig';
import { Copy } from './Copy';
import { UserCopy } from './UserCopy';

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
    { sequelize: bookishDb, timestamps: false },
);
