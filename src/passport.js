const passport = require('passport');
const { Book } = require('./entities/Book');
const { User } = require('./entities/User');
const { Connection } = require('tedious');
const LocalStrategy = require('passport-local').Strategy;
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        function (email, password, cb) {
            //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT

            const connection = new Connection(config);

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

            connection.connect((err) => {
                if (err) {
                    console.log('Connection Failed');
                    throw err;
                }
                executeStatement();
            });

            function executeStatement() {
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
                    let user = User.from_row(columns);
                    return cb(null, user, {
                        message: 'Logged In Successfully',
                    });
                });

                request.on('doneProc', function () {
                    return cb(null, false, {
                        message: 'Incorrect email or password.',
                    });
                });

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
            }
        },
    ),
);
