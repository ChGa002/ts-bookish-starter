import express from 'express';
import 'dotenv/config';
import healthcheckRoutes from './controllers/healthcheckController';
import bookRoutes from './controllers/bookController';
import userController from './controllers/userController';
import { Author } from './models/Author';

const passport = require('passport');
require('./passport');

const port = process.env['PORT'] || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
// sequelize

// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('bookish', 'cgandolfi', 'Lollipop1', {
//     host: 'CHAMELEON',
//     dialect: 'mssql',
// });
//
// try {
//     sequelize
//         .authenticate()
//         .then((r) =>
//             console.log('Connection has been established successfully.'),
//         );
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

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

Author.findAll({ attributes: ['id', 'name', 'surname'] }).then((results) => {
    console.log(results);
});
// app.use('/user', passport.authenticate('jwt', { session: false }), user);

// "eyJhbGciOiJIUzI1NiJ9.MQ.EAsT0TSknH90KJFcp9iRFFPZfIQmILPnY10Z1OmMGEM"
