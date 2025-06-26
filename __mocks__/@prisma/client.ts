// __mocks__/@prisma/client.ts
export class PrismaClient {
  session = {
    create: jest.fn().mockResolvedValue({ id: 'mock-session-id', name: 'Test Session', isFavorite: false }),
    update: jest.fn().mockImplementation(({ where, data }) => ({
      id: where.id,
      ...data,
    })),
    findUnique: jest.fn().mockResolvedValue({ id: 'mock-session-id', name: 'Renamed Session', isFavorite: true }),
    delete: jest.fn().mockResolvedValue({ id: 'mock-session-id' }),
  };

  message = {
    create: jest.fn().mockResolvedValue({ id: 'mock-message-id', sender: 'user', content: 'Hello', context: [] }),
    findMany: jest.fn().mockResolvedValue([
      { id: 'mock-message-id', sender: 'user', content: 'Hello', context: [] },
    ]),
    deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
  };

  $queryRaw = jest.fn().mockResolvedValue([{ 1: 1 }]);
  $disconnect = jest.fn();
}
