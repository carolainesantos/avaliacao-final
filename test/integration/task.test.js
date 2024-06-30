const { describe, expect, it } = require("@jest/globals");
const taskController = require("../../src/controller/task");
const projectController = require("../../src/controller/project");
const userController = require("../../src/controller/user");

describe("Testes de integração do Task", () => {
  beforeAll(async () => {
    const user = await userController.createUser(
      "Fulano",
      "fulano-task@teste.com",
      "123456"
    );
    this.USER_ID = user.id;

    const project = await projectController.createProject(
      "Projeto 2",
      "Descrição do projeto",
      this.USER_ID
    );
    this.PROJECT_ID = project.id;
  });

  afterAll(async () => {
    await projectController.delete(this.PROJECT_ID);
    await userController.delete(this.USER_ID);
  });

  it("Should add a task", async () => {
    const task = await taskController.createTask(
      "Task 1",
      "Descrição da task",
      this.PROJECT_ID
    );
    this.TASK_ID = task.id;

    expect(task).toHaveProperty("titulo", "Task 1");
  });

  it("Should find a task", async () => {
    const task = await taskController.findTask(this.TASK_ID);
    expect(task).toHaveProperty("titulo", "Task 1");
  });

  it("Should update a task", async () => {
    const task = await taskController.update(
      this.TASK_ID,
      "Task 2",
      "Descrição da task",
      undefined,
      undefined,
      this.PROJECT_ID
    );
    expect(task).toHaveProperty("titulo", "Task 2");
  });

  it("Should delete a task", async () => {
    const task = await taskController.delete(this.TASK_ID);
    expect(task).toBeUndefined();
  });
});
