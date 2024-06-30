const task = require("../model/task");
const ProjectController = require("./project");

class taskController {
  async createTask(titulo, descricao, projetoId) {
    try {
      if (
        titulo === undefined ||
        descricao === undefined ||
        projetoId === undefined
      ) {
        throw new Error("Título, descrição e projetoId são obrigatórios.");
      }

      await ProjectController.findProject(Number(projetoId));

      const taskValue = await task.create({
        titulo,
        descricao,
        projetoId,
      });

      return taskValue;
    } catch (error) {
      console.log(error);
    }
  }

  async findTask(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const taskValue = await task.findByPk(id);

    if (!taskValue) {
      throw new Error("Tarefa não encontrada.");
    }

    return taskValue;
  }

  async update(id, titulo, descricao, concluidoEm, status, projetoId) {
    if (projetoId) {
      await ProjectController.findProject(projetoId);
    }

    const taskValue = await this.findTask(id);

    taskValue.titulo = titulo || taskValue.titulo;
    taskValue.descricao = descricao || taskValue.descricao;
    taskValue.projetoId = projetoId || taskValue.projetoId;
    taskValue.concluidoEm = concluidoEm || taskValue.concluidoEm;
    taskValue.status = status || taskValue.status;
    taskValue.save();

    return taskValue;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const taskValue = await this.findTask(id);
    taskValue.destroy();

    return;
  }

  async findByProject(projetoId) {
    return task.findAll({ where: { projetoId } });
  }
}

module.exports = new taskController();
