import { Sequelize } from 'sequelize';

const bookishDb = new Sequelize('bookish', 'cgandolfi', 'Lollipop1', {
    host: 'CHAMELEON',
    dialect: 'mssql',
});

export default bookishDb;

// export const DatabaseConfig = {
//     server: 'CHAMELEON',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'cgandolfi',
//             password: 'Lollipop1',
//         },
//     },
//
//     options: {
//         trustServerCertificate: true,
//         trustedConnection: true,
//         database: 'bookish',
//     },
// };
