import prisma from '../../src/db/prisma';      
import logger from '../../src/utils/logger';  

import {
  createSessionService,
  renameSessionService,
  toggleFavoriteService,
  deleteSessionService,
  addMessageService,
  getMessagesService,
} from '../../src/services/sessionService';

jest.mock('@prisma/client');

describe('Session Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createSessionService creates a session', async () => {
    const mockSession = { id: '1', name: 'Test Session' };
    (prisma.session.create as jest.Mock).mockResolvedValue(mockSession);

    const result = await createSessionService('Test Session');

    expect(prisma.session.create).toHaveBeenCalledWith({
      data: { name: 'Test Session' },
    });
    expect(result).toEqual(mockSession);
  });

  it('renameSessionService renames a session', async () => {
    const mockSession = { id: '1', name: 'Updated Session' };
    (prisma.session.update as jest.Mock).mockResolvedValue(mockSession);

    const result = await renameSessionService('1', 'Updated Session');

    expect(prisma.session.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { name: 'Updated Session' },
    });
    expect(result).toEqual(mockSession);
  });

  it('toggleFavoriteService toggles isFavorite', async () => {
    const mockSession = { id: '1', isFavorite: false };
    const mockUpdated = { id: '1', isFavorite: true };

    (prisma.session.findUnique as jest.Mock).mockResolvedValue(mockSession);
    (prisma.session.update as jest.Mock).mockResolvedValue(mockUpdated);

    const result = await toggleFavoriteService('1');

    expect(prisma.session.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(prisma.session.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { isFavorite: true },
    });
    expect(result).toEqual(mockUpdated);
  });

  it('deleteSessionService deletes session and messages', async () => {
    const mockDeleted = { id: '1', name: 'Deleted Session' };

    (prisma.message.deleteMany as jest.Mock).mockResolvedValue({});
    (prisma.session.delete as jest.Mock).mockResolvedValue(mockDeleted);

    const result = await deleteSessionService('1');

    expect(prisma.message.deleteMany).toHaveBeenCalledWith({ where: { sessionId: '1' } });
    expect(prisma.session.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual(mockDeleted);
  });

  it('addMessageService creates a message', async () => {
    const mockMessage = {
      id: 'msg1',
      sender: 'user',
      content: 'Hello',
      sessionId: '1',
    };

    (prisma.message.create as jest.Mock).mockResolvedValue(mockMessage);

    const result = await addMessageService('1', 'user', 'Hello');

    expect(prisma.message.create).toHaveBeenCalledWith({
      data: {
        sessionId: '1',
        sender: 'user',
        content: 'Hello',
        context: undefined,
      },
    });
    expect(result).toEqual(mockMessage);
  });

  it('getMessagesService returns paginated messages', async () => {
    const mockMessages = [{ id: 'msg1', sender: 'user', content: 'Hello' }];
    (prisma.message.findMany as jest.Mock).mockResolvedValue(mockMessages);

    const result = await getMessagesService('1', 1, 10);

    expect(prisma.message.findMany).toHaveBeenCalledWith({
      where: { sessionId: '1' },
      skip: 0,
      take: 10,
      orderBy: { createdAt: 'asc' },
    });

    expect(result).toEqual(mockMessages);
  });
});
