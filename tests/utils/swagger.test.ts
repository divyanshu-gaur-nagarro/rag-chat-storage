import express from 'express';
import request from 'supertest';
import { setupSwagger } from '../../src/utils/swagger';

const app = express();
setupSwagger(app);

describe('Swagger Setup', () => {
  it('should expose /api-docs route', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.status).toBe(301); 
  });

  it('should serve Swagger UI on /api-docs/', async () => {
    const response = await request(app).get('/api-docs/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });
});
