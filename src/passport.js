const passport = require('passport');
const { Book } = require('./entities/Book');
const { User } = require('./entities/User');
const { Connection, Request } = require('tedious');
const LocalStrategy = require('passport-local').Strategy;

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

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email, password, cb) {
            return verifyEmailPassword(email, password)
                .then((user) => {
                    if (!user) {
                        return cb(null, false, {
                            message: 'Incorrect email or password.',
                        });
                    }
                    return cb(null, user, {
                        message: 'Logged In Successfully',
                    });
                })
                .catch((err) => cb(err));
        },
    ),
);

function verifyEmailPassword(email, password) {
    return new Promise((resolve, reject) => {
        const connection = new Connection(config);
        connection.connect((err) => {
            if (err) {
                console.log('Connection Failed');
                throw err;
            }

            const request = new Request(
                `select *
                 from Users
                 WHERE email = '${email}'
                   AND password = '${password}'`,
                function (err) {
                    if (err) {
                        throw err;
                    }
                },
            );

            connection.execSql(request);
            request.on('row', function (columns) {
                resolve(columns[0].value);
            });

            request.on('doneProc', function () {
                resolve(null);
            });
        });
    });
}

// return UserModel.findOne({ email, password })
//     .then((user) => {
//         if (!user) {
//             return cb(null, false, {
//                 message: 'Incorrect email or password.',
//             });
//         }
//         return cb(null, user, {
//             message: 'Logged In Successfully',
//         });
//     })
//     .catch((err) => cb(err));

/*export function correctUserAndPassword(username: string, password: string, connection){
    var output;

    var sql: string = "SELECT * FROM users WHERE username='" + username + "' and password='" + password + "'";
    var request = new Request(sql, function(err){
        if (err) {
            console.log(err);
        }
    });

    return new Promise((resolve, reject) => {

        request.on('row', function(columns) {
            output = columns[0].value;
        });

        request.on('error', error => reject(error));
        request.on('doneProc', () => resolve(output));
        connection.execSql(request);
    });*/
