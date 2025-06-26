import { createSessionService } from '../../src/services/sessionService';

describe('Session Service', () => {
  it('should create a session', async () => {
    const session = await createSessionService('Test Session');
    expect(session.name).toBe('Test Session');
  });
});
