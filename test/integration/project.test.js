const { describe, expect, it } = require("@jest/globals");
const projectController = require("../../src/controller/project");
const userController = require("../../src/controller/user");

describe("Testes de integração do Project", () => {
  beforeAll(async () => {
    const user = await userController.createUser(
      "Fulano",
      "fulanoproject@teste.com",
      "123456"
    );
    this.USER_ID = user.id;
  });

  afterAll(async () => {
    await userController.delete(this.USER_ID);
  });

  it("Should add a project", async () => {
    const project = await projectController.createProject(
      "Projeto 1",
      "Descrição do projeto",
      this.USER_ID
    );
    this.PROJECT_ID = project.id;

    expect(project).toHaveProperty("nome", "Projeto 1");
  });

  it("Should find a project", async () => {
    const project = await projectController.findProject(this.PROJECT_ID);
    expect(project).toHaveProperty("nome", "Projeto 1");
  });

  it("Should update a project", async () => {
    const project = await projectController.update(
      this.PROJECT_ID,
      "Projeto 2",
      "Descrição do projeto",
      this.USER_ID
    );
    expect(project).toHaveProperty("nome", "Projeto 2");
  });

  it("Should delete a project", async () => {
    const project = await projectController.delete(this.PROJECT_ID);
    expect(project).toBeUndefined();
  });
});
