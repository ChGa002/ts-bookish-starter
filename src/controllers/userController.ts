import { Router, Request, Response } from 'express';

class UserController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:id', this.showBooks.bind(this));
    }

    showBooks = (req: Request, res: Response): Response => {
        return res.status(200).json({ status: 'OK' });
    };
}

export default new UserController().router;
