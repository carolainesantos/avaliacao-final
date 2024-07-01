const express = require("express");
const TaskApi = require("../api/task");

const router = express.Router();
/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     tags: ["Task"]
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             descricao:
 *               type: string
 *             projetoId:
 *               type: number
 *     summary: Criação de uma nova Task
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '201':
 *         description: Task criada com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             descricao:
 *               type: string
 *             projetoId:
 *               type: number
 *             updatedAt:
 *               type: string
 *             createdAt:
 *               type: string
 *       '400':
 *         description: Token inválido
 */
router.post("/", TaskApi.createTask);
/**
 * @swagger
 * /api/v1/task:
 *   put:
 *     summary: Atualização dos dados da Task
 *     tags: ["Task"]
 *     security:
 *       - bearerAuth: ["JWT"]
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             descricao:
 *               type: string
 *             concluidaEm:
 *               type: string
 *             status:
 *               type: string
 *             projetoId:
 *               type: number
 *     responses:
 *       '200':
 *         description: Task alterada com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             titulo:
 *               type: string
 *             descricao:
 *               type: string
 *             concluidaEm:
 *               type: string
 *             status:
 *               type: string
 *             projetoId:
 *               type: number
 *             updatedAt:
 *               type: string
 *             createdAt:
 *               type: string
 *       '400':
 *         description: Token inválido
 */
router.put("/:id", TaskApi.updateTask);
/**
 * @swagger
 * /api/v1/task:
 *   get:
 *     tags: ["Task"]
 *     summary: Retorna todas as Tasks
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '200':
 *         description: Lista de Tasks
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               concluidaEm:
 *                 type: string
 *               status:
 *                 type: string
 *               projetoId:
 *                 type: number
 *               updatedAt:
 *                 type: string
 *               createdAt:
 *                 type: string
 *       '400':
 *         description: Token inválido
 */
router.get("/:projetoId", TaskApi.findTasks);
/**
 * @swagger
 * /api/v1/task:
 *   delete:
 *     tags: ["Task"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     summary: Deleta a Task informada
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '204':
 *         description: Task deletada com sucesso
 *       '400':
 *         description: Token inválido
 */
router.delete("/:id", TaskApi.deleteTask);

module.exports = router;
