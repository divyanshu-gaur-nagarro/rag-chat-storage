import { Request, Response, NextFunction } from 'express';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction): void => {
  const clientKey = req.headers['x-api-key'];
  const serverKey = process.env.API_KEY;

  if (!clientKey || clientKey !== serverKey) {
    res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    return;
  }

  next();
};
