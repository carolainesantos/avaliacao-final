const project = require("../model/project");
const UserController = require("./user");

class projectController {
  async createProject(nome, descricao, usuarioId) {
    if (
      nome === undefined ||
      descricao === undefined ||
      usuarioId === undefined
    ) {
      throw new Error("Nome, Descricao, UsuarioId são obrigatórios.");
    }

    await UserController.findUser(Number(usuarioId));

    const projectValue = await project.create({
      nome,
      descricao,
      usuarioId,
    });

    return projectValue;
  }

  async findProject(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }

    const projectValue = await project.findByPk(id);

    if (!projectValue) {
      throw new Error("Projeto não encontrada.");
    }

    return projectValue;
  }

  async update(id, nome, descricao, usuarioId) {
    if (usuarioId) {
      await UserController.findUser(usuarioId);
    }
    const projectValue = await this.findProject(id);
    projectValue.nome = nome || projectValue.nome;
    projectValue.descricao = descricao || projectValue.descricao;
    projectValue.usuarioId = usuarioId || projectValue.usuarioId;
    projectValue.save();

    return projectValue;
  }

  async delete(id) {
    if (id === undefined) {
      throw new Error("Id é obrigatório.");
    }
    const projectValue = await this.findProject(id);
    projectValue.destroy();

    return;
  }

  async find() {
    return project.findAll();
  }
}

module.exports = new projectController();
