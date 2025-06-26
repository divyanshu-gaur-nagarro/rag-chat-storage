import request from 'supertest';
import app from '../../src/app';

const API_KEY = process.env.API_KEY || 'test-api-key'; 

let sessionId: string;

describe('Session Controller Integration Tests', () => {
  it('should create a new session', async () => {
    const res = await request(app)
      .post('/api/sessions') 
      .set('x-api-key', API_KEY)
      .send({ name: 'Test Session' });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Session');
    sessionId = res.body.id;
  });

  it('should rename the session', async () => {
    const res = await request(app)
      .patch(`/api/sessions/${sessionId}/rename`) 
      .set('x-api-key', API_KEY)
      .send({ name: 'Renamed Session' });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Renamed Session');
  });

  it('should toggle favorite status', async () => {
    const res = await request(app)
      .patch(`/api/sessions/${sessionId}/favorite`) 
      .set('x-api-key', API_KEY);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('isFavorite');
  });

  it('should add a message to the session', async () => {
    const res = await request(app)
      .post(`/api/sessions/${sessionId}/messages`)
      .set('x-api-key', API_KEY)
      .send({ sender: 'user', content: 'Hello', context: [] });

    expect(res.status).toBe(201);
    expect(res.body.sender).toBe('user');
    expect(res.body.content).toBe('Hello');
  });

  it('should get session messages', async () => {
    const res = await request(app)
      .get(`/api/sessions/${sessionId}/messages`) 
      .set('x-api-key', API_KEY)
      .query({ page: 1, limit: 10 });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].sender).toBe('user');
  });

  it('should delete the session', async () => {
    const res = await request(app)
      .delete(`/api/sessions/${sessionId}`)
      .set('x-api-key', API_KEY);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Session deleted successfully');
  });
});
