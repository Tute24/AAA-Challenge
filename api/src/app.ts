import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { env } from './env';
import { authRouter } from './routers/auth-router';
import { errorHandler } from './middlewares/error-handler';

const app = express();
const PORT = env.PORT || 3333;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(express.json());
app.use('/auth', authRouter);
app.use(errorHandler);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
