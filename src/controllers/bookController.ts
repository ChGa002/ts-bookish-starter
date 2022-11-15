import { Router, Request, Response } from 'express';
import {Book} from "../entities/Book";
import { Connection } from 'tedious';
import {Request as TediousRequest} from 'tedious';
import {DatabaseConfig} from "../databaseConfig";

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.post('/create', this.createBook.bind(this));
        this.router.post('/:id/addcopy', this.addCopy.bind(this));
        this.router.get('/getByTitle', this.getByTitle.bind(this));
        this.router.get('/', this.getAllBooks.bind(this));

    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    addCopy(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getByTitle(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getAllBooks(req: Request, res: Response) {

        const connection = new Connection(DatabaseConfig);

        connection.connect((err) => {
            if (err) {
                console.log('Connection Failed');
                throw err;
            }
            executeStatement();
        });

        const bookArray: Book[] = [];

        function executeStatement() {
            const request = new TediousRequest('select * from Books', function (err) {
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
                return res.status(200).json({
                    Books: bookArray
                });
            });
        }
    }
}

export default new BookController().router;
