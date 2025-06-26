import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../../src/middlewares/errorHandler';
import logger from '../../src/utils/logger';

jest.mock('../../src/utils/logger');

describe('errorHandler middleware', () => {
  let req: Request;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      originalUrl: '/test-endpoint',
    } as Request;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return default 500 error when no status is provided', () => {
    const err = new Error('Test error');

    errorHandler(err, req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Test error' });
    expect(logger.error).toHaveBeenCalledWith('GET /test-endpoint - Test error');
  });

  it('should use error.status if provided', () => {
    const err = new Error('Not Found') as any;
    err.status = 404;

    errorHandler(err, req, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found' });
    expect(logger.error).toHaveBeenCalledWith('GET /test-endpoint - Not Found');
  });
});
