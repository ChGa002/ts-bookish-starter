import express from 'express';
import 'dotenv/config';

import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';

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

const Connection = require('tedious').Connection;
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

connection.connect((err) => {
    if (err) {
        console.log('Connection Failed');
        throw err;
    }
    // executeStatement();
});

function executeStatement() {
    // @ts-ignore
    const request = new Request('select * from Books', function (
        err,
        rowCount,
    ) {
        if (err) {
            throw err;
        }
        console.log('DONE!');
        connection.close();
    });
}

app.get('/books', function (req, res) {
    res.send('hello world TEST');
});
