const { Model, DataTypes } = require('sequelize');
import bookishDb from '../databaseConfig';
import { Copy } from './Copy';
import { User } from './User';

export class UserCopy extends Model {
    otherPublicField;
}
UserCopy.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: User, // 'Movies' would also work
                key: 'id',
            },
        },
        copy_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: Copy, // 'Actors' would also work
                key: 'id',
            },
        },
        dateBorrowed: {
            type: DataTypes.DATE,
            primaryKey: true
        },
        dateDue: DataTypes.DATE,
        returned: DataTypes.BOOLEAN,
    },
    { sequelize: bookishDb, tableName: 'users_copies', timestamps: false },
);
