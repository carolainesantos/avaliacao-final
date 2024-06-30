const ProjectController = require("../controller/project");

class ProjectApi {
  async createProject(req, res) {
    const { nome, descricao, usuarioId } = req.body;

    try {
      const project = await ProjectController.createProject(
        nome,
        descricao,
        usuarioId
      );
      return res.status(201).send(project);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao criar projeto ${e.message}` });
    }
  }

  async updateProject(req, res) {
    const { id } = req.params;
    const { nome, descricao, usuarioId } = req.body;

    try {
      const project = await ProjectController.update(
        Number(id),
        nome,
        descricao,
        usuarioId
      );
      return res.status(200).send(project);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao alterar projeto ${e.message}` });
    }
  }

  async deleteProject(req, res) {
    const { id } = req.params;

    try {
      await ProjectController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao deletar projeto ${e.message}` });
    }
  }

  async findProjects(req, res) {
    try {
      const projects = await ProjectController.find();
      return res.status(200).send(projects);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Erro ao listar projetos ${e.message}` });
    }
  }
}

module.exports = new ProjectApi();
