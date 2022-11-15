import express from 'express';
import 'dotenv/config';
import {Book} from './entities/Book';
import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import {Connection, Request} from 'tedious';

const passport = require('passport');
require('./passport');

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({extended: true}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});

/**
 * Primary app routes.
 */
app.use('/healthcheck', healthcheckRoutes);
app.use('/books', passport.authenticate('jwt', {session: false}), bookRoutes);
app.use(express.json());
const auth = require('./auth');
app.use('/auth', auth);
// app.use('/user', passport.authenticate('jwt', { session: false }), user);

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


// "eyJhbGciOiJIUzI1NiJ9.MQ.EAsT0TSknH90KJFcp9iRFFPZfIQmILPnY10Z1OmMGEM"
