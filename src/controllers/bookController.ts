import { Router, Request, Response } from 'express';
import { Book } from '../models/Book';
import { Connection } from 'tedious';
import { Request as TediousRequest } from 'tedious';
const { Op } = require("sequelize");

// import {DatabaseConfig} from "../databaseConfig";

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.getBook.bind(this));
        this.router.post('/create', this.createBook.bind(this));
        this.router.post('/:id/addcopy', this.addCopy.bind(this));
        this.router.post('/search', this.search.bind(this));
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
        try {
            const newBook = Book.build({
                isbn: req.query.isbn,
                title: req.query.title,
            });
            newBook.save().then(() => {
                return res.status(200).json({ status: 'OK' });
            });
        } catch (err) {
            return res.status(500).json({
                error: 'input_error',
                error_description: 'isbn or title not provided',
            });
        }
    }

    addCopy(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    search(req: Request, res: Response) {
        if (req.query.title != undefined) {
            Book.findAll({ where: { title: {[Op.like]:`%${req.query.title}%` }} })
                .then((books) => {
                    if (books.length > 0) {
                        return res.status(200).json(books);
                    }
                    return res.status(204).json();
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: 'Internal server error',
                        error_description: 'Unable to get books: ' + err,
                    });
                });
        } else {
            return res.status(400).json({
                error: 'Bad request',
                error_description: 'Please specify a value for title',
            });
        }
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
