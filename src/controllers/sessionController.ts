// src/controllers/sessionController.ts
import { Request, Response } from 'express';
import {
  createSessionService,
  renameSessionService,
  toggleFavoriteService,
  deleteSessionService,
  addMessageService,
  getMessagesService
} from '../services/sessionService';
import logger from '../utils/logger';

export const createSession = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const session = await createSessionService(name);
    logger.info(`Session created: ${session.id}`);
    res.status(201).json(session);
  } catch (error) {
    logger.error(`Failed to create session: ${(error as Error).message}`);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

export const renameSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const session = await renameSessionService(id, name);
    logger.info(`Session renamed: ${id}`);
    res.json(session);
  } catch (error) {
    logger.error(`Failed to rename session ${id}: ${(error as Error).message}`);
    res.status(500).json({ error: 'Failed to rename session' });
  }
};

export const toggleFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const session = await toggleFavoriteService(id);
    logger.info(`Favorite toggled for session: ${id}`);
    res.json(session);
  } catch (error: unknown) {
    const err = error as Error;
    logger.error(`Failed to toggle favorite for session ${id}: ${err.message}`);
    res.status(500).json({ error: err.message || 'Failed to toggle favorite' });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteSessionService(id);
    logger.info(`Session deleted: ${id}`);
    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    logger.error(`Failed to delete session ${id}: ${(error as Error).message}`);
    res.status(500).json({ error: 'Failed to delete session' });
  }
};

export const addMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sender, content, context } = req.body;
  try {
    const message = await addMessageService(id, sender, content, context);
    logger.info(`Message added to session ${id}`);
    res.status(201).json(message);
  } catch (error) {
    logger.error(`Failed to add message to session ${id}: ${(error as Error).message}`);
    res.status(500).json({ error: 'Failed to add message' });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { id } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  try {
    const messages = await getMessagesService(id, page, limit);
    logger.info(`Fetched ${messages.length} messages for session ${id}`);
    res.json(messages);
  } catch (error) {
    logger.error(`Failed to retrieve messages for session ${id}: ${(error as Error).message}`);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
