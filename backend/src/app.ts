import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
import { sweetsRouter } from './routes/sweets.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/sweets', sweetsRouter);

app.get('/', (req, res) => res.json({ ok: true, message: 'Sweet Shop API' }));

app.use(errorHandler);

export default app;
