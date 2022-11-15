const { Model, DataTypes } = require('sequelize');
import bookishDb from '../databaseConfig';

export class Author extends Model {
    otherPublicField;
}
Author.init(
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
    },
    { sequelize: bookishDb },
);
