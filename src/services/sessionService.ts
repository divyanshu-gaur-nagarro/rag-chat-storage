// src/services/sessionService.ts
import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

const prisma = new PrismaClient();

export const createSessionService = async (name: string) => {
  try {
    const session = await prisma.session.create({ data: { name } });
    logger.info(`Created session in DB: ${session.id}`);
    return session;
  } catch (error) {
    logger.error(`DB error in createSessionService: ${(error as Error).message}`);
    throw error;
  }
};

export const renameSessionService = async (id: string, name: string) => {
  try {
    const session = await prisma.session.update({ where: { id }, data: { name } });
    logger.info(`Renamed session in DB: ${id}`);
    return session;
  } catch (error) {
    logger.error(`DB error in renameSessionService for ${id}: ${(error as Error).message}`);
    throw error;
  }
};

export const toggleFavoriteService = async (id: string) => {
  try {
    const session = await prisma.session.findUnique({ where: { id } });
    if (!session) throw new Error('Session not found');
    const updated = await prisma.session.update({
      where: { id },
      data: { isFavorite: !session.isFavorite },
    });
    logger.info(`Toggled favorite for session: ${id}`);
    return updated;
  } catch (error) {
    logger.error(`DB error in toggleFavoriteService for ${id}: ${(error as Error).message}`);
    throw error;
  }
};

export const deleteSessionService = async (id: string) => {
  try {
    await prisma.message.deleteMany({ where: { sessionId: id } });
    const deleted = await prisma.session.delete({ where: { id } });
    logger.info(`Deleted session and messages: ${id}`);
    return deleted;
  } catch (error) {
    logger.error(`DB error in deleteSessionService for ${id}: ${(error as Error).message}`);
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
      data: { sessionId, sender, content, context },
    });
    logger.info(`Added message to session ${sessionId}`);
    return message;
  } catch (error) {
    logger.error(`DB error in addMessageService for ${sessionId}: ${(error as Error).message}`);
    throw error;
  }
};

export const getMessagesService = async (sessionId: string, page: number, limit: number) => {
  try {
    const messages = await prisma.message.findMany({
      where: { sessionId },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'asc' },
    });
    logger.info(`Retrieved ${messages.length} messages for session ${sessionId}`);
    return messages;
  } catch (error) {
    logger.error(`DB error in getMessagesService for ${sessionId}: ${(error as Error).message}`);
    throw error;
  }
};
