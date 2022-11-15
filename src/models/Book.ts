import { Copy } from './Copy';

const { Model, DataTypes } = require('sequelize');
import bookishDb from '../databaseConfig';

export class Book extends Model {
    otherPublicField;
}
Book.init(
    {
        isbn: {
            type: DataTypes.BIGINT,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { sequelize: bookishDb, timestamps: false },
);

// Book.hasMany(Copy, { foreignKey: 'book_id'});

// export class Book {
//     isbn: number;
//     title: string;
//
//     constructor(isbn: number, title: string) {
//         this.isbn = isbn;
//         this.title = title;
//     }
// }
