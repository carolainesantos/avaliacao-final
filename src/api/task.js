const TaskController = require("../controller/task");

class TaskApi {
  async createTask(req, res) {
    const { titulo, descricao, projetoId } = req.body;

    try {
      const task = await TaskController.createTask(
        titulo,
        descricao,
        projetoId
      );
      return res.status(201).send(task);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar tarefa ${e.message}` });
    }
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const { titulo, descricao, concluidoEm, status, projetoId } = req.body;

    try {
      const task = await TaskController.update(
        Number(id),
        titulo,
        descricao,
        concluidoEm,
        status,
        projetoId
      );
      return res.status(200).send(task);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao alterar tarefa ${e.message}` });
    }
  }

  async deleteTask(req, res) {
    const { id } = req.params;

    try {
      await TaskController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao deletar tarefa ${e.message}` });
    }
  }

  async findTasks(req, res) {
    try {
      const { projetoId } = req.params;
      const tasks = await TaskController.findByProject(projetoId);
      return res.status(200).send(tasks);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar taskagens ${e.message}` });
    }
  }
}

module.exports = new TaskApi();
