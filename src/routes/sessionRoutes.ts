import express from 'express';
import {
  addMessage,
  createSession,
  deleteSession,
  getMessages,
  renameSession,
  toggleFavorite,
} from '../controllers/sessionController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Sessions
 *     description: Session management
 *   - name: Messages
 *     description: Chat message operations
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a new chat session
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: "My new chat"
 *     responses:
 *       201:
 *         description: Session created
 */
router.post('/sessions', createSession);

/**
 * @swagger
 * /api/sessions/{id}/rename:
 *   patch:
 *     summary: Rename a session
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *           example:
 *             name: "Renamed session title"
 *     responses:
 *       200:
 *         description: Session renamed
 */
router.patch('/sessions/:id/rename', renameSession);

/**
 * @swagger
 * /api/sessions/{id}/favorite:
 *   patch:
 *     summary: Toggle favorite
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Favorite toggled
 */
router.patch('/sessions/:id/favorite', toggleFavorite);

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete session and all messages
 *     tags: [Sessions]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Session deleted
 */
router.delete('/sessions/:id', deleteSession);

/**
 * @swagger
 * /api/sessions/{id}/messages:
 *   post:
 *     summary: Add a new message to a session
 *     tags: [Messages]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sender
 *               - content
 *             properties:
 *               sender:
 *                 type: string
 *               content:
 *                 type: string
 *               context:
 *                 type: string
 *           example:
 *             sender: "user"
 *             content: "What's the weather like today?"
 *             context: "retrieved_context_snippet"
 *     responses:
 *       201:
 *         description: Message added
 */
router.post('/sessions/:id/messages', addMessage);

/**
 * @swagger
 * /api/sessions/{id}/messages:
 *   get:
 *     summary: Get messages in a session
 *     tags: [Messages]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of messages per page
 *     responses:
 *       200:
 *         description: List of messages
 */
router.get('/sessions/:id/messages', getMessages);

export default router;
