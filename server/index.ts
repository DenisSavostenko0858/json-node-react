import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import router from './router/index_router';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});