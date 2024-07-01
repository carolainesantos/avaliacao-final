const express = require("express");
const ProjectApi = require("../api/project");

const router = express.Router();
/**
 * @swagger
 * /api/v1/project:
 *   post:
 *     summary: Criação de Projetos
 *     tags: ["Project"]
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             descricao:
 *               type: string
 *             usuarioId:
 *               type: number
 *         required:
 *           - nome
 *           - descricao
 *           - usuarioId
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '201':
 *         description: Projeto criado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             nome:
 *               type: string
 *             descricao:
 *               type: string
 *             usuarioId:
 *               type: number
 *             createdAt:
 *               type: string
 *             updatedAt:
 *               type: string
 *       '400':
 *         description: Token inválido
 */
router.post("/", ProjectApi.createProject);
/**
 * @swagger
 * /api/v1/project:
 *   put:
 *     tags: ["Project"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             descricao:
 *               type: string
 *             usuarioId:
 *               type: number
 *     summary: Atualização de dados do Projeto
 *     security:
 *       - bearerAuth: [JWT]
 *     responses:
 *       '200':
 *         description: Projeto atualizado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             nome:
 *               type: string
 *             descricao:
 *               type: string
 *             usuarioId:
 *               type: number
 *             createdAt:
 *               type: string
 *             updatedAt:
 *               type: string
 *       '401':
 *         description: Não autorizado
 *       '400':
 *         description: Token inválido
 */
router.put("/:id", ProjectApi.updateProject);
/**
 * @swagger
 * /api/v1/project:
 *   get:
 *     tags: ["Project"]
 *     summary: Retorna todos os projetos existentes
 *     security:
 *       - bearerAuth: [JWT]
 *     responses:
 *       '200':
 *         description: Lista de Projetos
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               usuarioId:
 *                 type: number
 *               createdAt:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *       '400':
 *         description: Token inválido
 */
router.get("/", ProjectApi.findProjects);
/**
 * @swagger
 * /api/v1/project:
 *   delete:
 *     tags: ["Project"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     summary: Deleta o projeto informado
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '204':
 *         description: Projeto deletado com sucesso
 *       '400':
 *         description: Token inválido
 */
router.delete("/:id", ProjectApi.deleteProject);

module.exports = router;
