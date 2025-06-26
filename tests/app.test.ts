import request from 'supertest';
import app from '../src/app';

describe('App Initialization & Health Check', () => {
  it('should return 200 OK for /health endpoint', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('db', 'connected');
  });

  it('should return 429 for too many requests', async () => {
    const requests = Array.from({ length: 101 }).map(() =>
      request(app).get('/health')
    );
    const responses = await Promise.all(requests);
    const rateLimited = responses.find(res => res.status === 429);
    expect(rateLimited).toBeDefined();
  });
});
