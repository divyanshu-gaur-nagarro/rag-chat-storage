import request from 'supertest';
import app from '../../src/app';
import * as sessionController from '../../src/controllers/sessionController';

jest.mock('../../src/controllers/sessionController');

describe('Session Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockApiKey = 'supersecretkey123';

  const mockHeaders = {
    'x-api-key': mockApiKey,
  };

  it('POST /api/sessions should call createSession', async () => {
    (sessionController.createSession as jest.Mock).mockImplementation((req, res) =>
      res.status(201).json({ id: '123', name: 'Test session' })
    );

    const response = await request(app)
      .post('/api/sessions')
      .set(mockHeaders)
      .send({ name: 'Test session' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test session');
    expect(sessionController.createSession).toHaveBeenCalled();
  });

  it('PATCH /api/sessions/:id/rename should call renameSession', async () => {
    (sessionController.renameSession as jest.Mock).mockImplementation((req, res) =>
      res.status(200).json({ id: '123', name: 'Updated Name' })
    );

    const response = await request(app)
      .patch('/api/sessions/123/rename')
      .set(mockHeaders)
      .send({ name: 'Updated Name' });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Name');
  });

  it('PATCH /api/sessions/:id/favorite should call toggleFavorite', async () => {
    (sessionController.toggleFavorite as jest.Mock).mockImplementation((req, res) =>
      res.status(200).json({ id: '123', isFavorite: true })
    );

    const response = await request(app)
      .patch('/api/sessions/123/favorite')
      .set(mockHeaders);

    expect(response.status).toBe(200);
    expect(response.body.isFavorite).toBe(true);
  });

  it('DELETE /api/sessions/:id should call deleteSession', async () => {
    (sessionController.deleteSession as jest.Mock).mockImplementation((req, res) =>
      res.status(200).json({ message: 'Session deleted successfully' })
    );

    const response = await request(app)
      .delete('/api/sessions/123')
      .set(mockHeaders);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Session deleted successfully');
  });

  it('POST /api/sessions/:id/messages should call addMessage', async () => {
    (sessionController.addMessage as jest.Mock).mockImplementation((req, res) =>
      res.status(201).json({ sender: 'user', content: 'Hi' })
    );

    const response = await request(app)
      .post('/api/sessions/123/messages')
      .set(mockHeaders)
      .send({ sender: 'user', content: 'Hi' });

    expect(response.status).toBe(201);
    expect(response.body.sender).toBe('user');
  });

  it('GET /api/sessions/:id/messages should call getMessages', async () => {
    (sessionController.getMessages as jest.Mock).mockImplementation((req, res) =>
      res.status(200).json([{ sender: 'user', content: 'Hi' }])
    );

    const response = await request(app)
      .get('/api/sessions/123/messages')
      .set(mockHeaders);

    expect(response.status).toBe(200);
    expect(response.body[0].sender).toBe('user');
  });
});
