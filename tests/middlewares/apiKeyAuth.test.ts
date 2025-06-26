import { Request, Response, NextFunction } from 'express';
import { apiKeyAuth } from '../../src/middlewares/apiKeyAuth';

describe('apiKeyAuth middleware', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, API_KEY: 'test-key' };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it('should allow request with valid API key', () => {
    const req = {
      headers: { 'x-api-key': 'test-key' }
    } as unknown as Request;

    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    apiKeyAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should reject request with invalid API key', () => {
    const req = {
      headers: { 'x-api-key': 'wrong-key' }
    } as unknown as Request;

    const res = mockResponse();
    const next = jest.fn() as NextFunction;

    apiKeyAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized: Invalid API key' });
    expect(next).not.toHaveBeenCalled();
  });
});
