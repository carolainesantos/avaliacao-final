const express = require("express");

const UserApi = require("../api/user");
const router = express.Router();
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: Login
 *     description: Autentica um usuário usando seu e-mail e senha, retornando um token para gerenciamento de sessão.
 *     tags: ["Users"]
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             senha:
 *               type: string
 *         required:
 *           - email
 *           - senha
 *     responses:
 *       '200':
 *         description: Login criado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             token:
 *               type: string
 *       '400':
 *         description: error [1] Usuário e senha inválidos.
 */
/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Criação de usuário
 *     description: Cria um novo usuário com os dados fornecidos (nome, e-mail e senha)
 *     tags: ["Users"]
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             senha:
 *               type: string
 *         required:
 *           - email
 *           - senha
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             updatedAt:
 *               type: string
 *             createdAt:
 *               type: string
 *       '400':
 *         description: Erro ao criar usuário Nome, email e senha são obrigatórios.
 */
/**
 * @swagger
 * /api/v1/user:
 *   put:
 *     summary: Atualização de dados do usuário
 *     tags: ["Users"]
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
 *             email:
 *               type: string
 *             senha:
 *               type: string
 *         required:
 *           - email
 *           - password
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '200':
 *         description: Usuario alterado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             nome:
 *               type: string
 *             email:
 *               type: string
 *             updatedAt:
 *               type: string
 *             createdAt:
 *               type: string
 *       '400':
 *         description: Token inválido
 */
router.put("/:id", UserApi.updateUser);
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Retorna todos os usuários do sistema
 *     tags: ["Users"]
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '200':
 *         description: Lista de usuários
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               updatedAt:
 *                 type: string
 *               createdAt:
 *                 type: string
 *       '400':
 *         description: Token inválido
 */
router.get("/", UserApi.findUsers);
/**
 * @swagger
 * /api/v1/user:
 *   delete:
 *     tags: ["Users"]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     summary: Deleta o usuário informado
 *     security:
 *       - bearerAuth: ["JWT"]
 *     responses:
 *       '204':
 *         description: Usuário deletado com sucesso
 *       '400':
 *         description: Token inválido
 */
router.delete("/:id", UserApi.deleteUser);

module.exports = router;
