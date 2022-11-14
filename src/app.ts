import express from 'express';
import 'dotenv/config';
import { Book } from './entities/Book';
import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import { Connection, Request } from 'tedious';

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', bookRoutes);

const config = {
    server: 'CHAMELEON',
    authentication: {
        type: 'default',
        options: {
            userName: 'cgandolfi',
            password: 'Lollipop1',
        },
    },

    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        database: 'bookish',
    },
};
const connection = new Connection(config);

app.get('/books', function (req, res) {


    connection.connect((err) => {
        if (err) {
            console.log('Connection Failed');
            throw err;
        }
        executeStatement();
    });

    const bookArray: Book[] = [];

    function executeStatement() {
        const request = new Request('select * from Books', function (err) {
            if (err) {
                throw err;
            }
        });

        connection.execSql(request);

        request.on('row', function (columns) {
            const array: any[] = [];
            columns.forEach(function (column) {
                array.push(column.value);
            });

            bookArray.push(new Book(array[0], array[1]));
        });

        request.on('doneProc', function () {
            console.log(bookArray);
            res.send(JSON.stringify(bookArray));
        });

    }
});
