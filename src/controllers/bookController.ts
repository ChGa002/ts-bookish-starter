import { Router, Request, Response } from 'express';
import { Book } from '../models/Book';
import { Connection } from 'tedious';
import { Request as TediousRequest } from 'tedious';

// import {DatabaseConfig} from "../databaseConfig";

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
        Book.findAll()
            .then((books) => {
                return res.status(200).json(books);
            })
            .catch((err) => {
                return res.status(500).json({
                    error: 'Internal server error',
                    error_description: 'Unable to get books: ' + err,
                });
            });
    }
}

export default new BookController().router;
