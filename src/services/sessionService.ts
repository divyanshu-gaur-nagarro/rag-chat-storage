import prisma from '../db/prisma';
import logger from '../utils/logger';

export const createSessionService = async (name: string) => {
  try {
    const session = await prisma.session.create({
      data: { name },
    });
    logger.info(`Session created in DB: ${session.id}`);
    return session;
  } catch (error) {
    logger.error(`DB error in createSessionService: ${(error as Error).message}`);
    throw error;
  }
};

export const renameSessionService = async (id: string, name: string) => {
  try {
    const session = await prisma.session.update({
      where: { id },
      data: { name },
    });
    logger.info(`Renamed session in DB: ${id}`);
    return session;
  } catch (error) {
    logger.error(`DB error in renameSessionService: ${(error as Error).message}`);
    throw error;
  }
};

export const toggleFavoriteService = async (id: string) => {
  try {
    const existingSession = await prisma.session.findUnique({
      where: { id },
    });

    if (!existingSession) {
      throw new Error('Session not found');
    }

    const updated = await prisma.session.update({
      where: { id },
      data: { isFavorite: !existingSession.isFavorite },
    });

    logger.info(`Toggled favorite in DB: ${id}`);
    return updated;
  } catch (error) {
    logger.error(`DB error in toggleFavoriteService for ${id}: ${(error as Error).message}`);
    throw error;
  }
};

export const deleteSessionService = async (id: string) => {
  try {
    await prisma.message.deleteMany({
      where: { sessionId: id },
    });

    const deleted = await prisma.session.delete({
      where: { id },
    });

    logger.info(`Deleted session and messages: ${id}`);
    return deleted;
  } catch (error) {
    logger.error(`DB error in deleteSessionService: ${(error as Error).message}`);
    throw error;
  }
};

export const addMessageService = async (
  sessionId: string,
  sender: string,
  content: string,
  context?: string
) => {
  try {
    const message = await prisma.message.create({
      data: {
        sessionId,
        sender,
        content,
        context,
      },
    });

    logger.info(`Added message to session ${sessionId}`);
    return message;
  } catch (error) {
    logger.error(`DB error in addMessageService: ${(error as Error).message}`);
    throw error;
  }
};

export const getMessagesService = async (
  sessionId: string,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;
  try {
    const messages = await prisma.message.findMany({
      where: { sessionId },
      skip,
      take: limit,
      orderBy: { createdAt: 'asc' }, 
    });

    logger.info(`Fetched ${messages.length} messages for session ${sessionId}`);
    return messages;
  } catch (error) {
    logger.error(`DB error in getMessagesService for ${sessionId}: ${(error as Error).message}`);
    throw error;
  }
};
