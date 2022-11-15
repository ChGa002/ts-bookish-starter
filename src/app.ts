import express from 'express';
import 'dotenv/config';
import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import userController from './controllers/userController';
import { Book } from './models/Book';
import { Copy } from './models/Copy';
import { User } from './models/User';
import { UserCopy } from './models/UserCopy';

require('./models/associations');

const passport = require('passport');
require('./passport');

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
app.use('/books', passport.authenticate('jwt', { session: false }), bookRoutes);
app.use(
    '/users',
    passport.authenticate('jwt', { session: false }),
    userController,
);

app.use(express.json());
const auth = require('./auth');
app.use('/auth', auth);

