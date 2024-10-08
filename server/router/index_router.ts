import express, { Request, Response } from 'express';

const router = express.Router();

interface User {
    email: string;
    number: string;
}

const users: User[] = [
    { email: 'jim@gmail.com', number: '221122' },
    { email: 'jam@gmail.com', number: '830347' },
    { email: 'john@gmail.com', number: '221122' },
    { email: 'jams@gmail.com', number: '349425' },
    { email: 'jams@gmail.com', number: '141424' },
    { email: 'jill@gmail.com', number: '822287' },
    { email: 'jill@gmail.com', number: '822286' }
];

let currentRequest: NodeJS.Timeout | null = null;

router.post('/search', (req: Request, res: Response) => {
    const { email, number }: { email?: string; number?: string } = req.body;

    console.log('Полученные данные: ', req.body); 

    if (!email) {
        return res.status(400).json({ error: 'Почта не определена' });
    }
    
    if (currentRequest) {
        clearTimeout(currentRequest);
    }

    currentRequest = setTimeout(() => {
        const filterUsers = users.filter(user => 
            user.email === email && (!number || user.number === number)
        );

        if (filterUsers.length === 0) {
            return res.status(404).json({ error: 'Данные не найдены' });
        }

        res.json(filterUsers);
    }, 5000);
});

export default router;
