const { Model, DataTypes } = require('sequelize');
import bookishDb from '../databaseConfig';
import { Book } from './Book';
// import { User } from './User';

export class Copy extends Model {
    otherPublicField;
}
Copy.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        // isbn: {
        //     type: DataTypes.BIGINT,
        // },
        available: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    { sequelize: bookishDb, timestamps: false },
);

