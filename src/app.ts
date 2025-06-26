import express from 'express';
import sessionRoutes from './routes/sessionRoutes';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { apiKeyAuth } from './middlewares/apiKeyAuth';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './utils/swagger';
import { errorHandler } from './middlewares/errorHandler';
import logger from './utils/logger';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    logger.error('Health check DB error: ' + (error as Error).message);
    res.status(500).json({ status: 'error', db: 'not connected', error });
  }
});

setupSwagger(app);
app.use('/api', apiKeyAuth, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});