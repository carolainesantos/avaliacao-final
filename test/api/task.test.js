const app = require("../../src/server");
const request = require("supertest");

describe("Teste de api pra Task", () => {
  beforeAll(async () => {
    const body = { nome: "Teste", email: "task@teste.com", senha: 123 };
    const user = await request(app).post("/api/v1/user").send(body);
    this.userId = user.body.id;
    const login = await request(app).post("/api/v1/login").send(body);
    this.token = login.body.token;
    const project = await request(app)
      .post("/api/v1/project")
      .set("Authorization", this.token)
      .send({
        nome: "Projeto Teste",
        descricao: "Projetinho",
        usuarioId: this.userId,
      });
    this.projetoId = project.body.id;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/project/${this.projetoId}`)
      .set("Authorization", this.token);
    await request(app)
      .delete(`/api/v1/user/${this.userId}`)
      .set("Authorization", this.token);
  });

  test("Deve adicionar uma nova tarefa", async () => {
    const body = {
      titulo: "Tarefa teste",
      descricao: "Tarefa",
      projetoId: this.projetoId,
    };
    const response = await request(app)
      .post("/api/v1/task")
      .set("Authorization", this.token)
      .send(body);

    expect(response.statusCode).toEqual(201);
    expect(response.body.titulo).toBe(body.titulo);
    expect(response.body.descricao).toBe(body.descricao);
    expect(response.body.projetoId).toBe(body.projetoId);
    this.taskId = response.body.id;
  });

  test("Deve listar as tarefas de um projeto", async () => {
    const response = await request(app)
      .get(`/api/v1/task/${this.projetoId}`)
      .set("Authorization", this.token);

    expect(response.statusCode).toEqual(200);
    console.log(response.body);
  });

  test("Deve atualizar uma tarefa", async () => {
    const body = {
      titulo: "Tarefa teste atualizada",
    };
    const response = await request(app)
      .put(`/api/v1/task/${this.taskId}`)
      .set("Authorization", this.token)
      .send(body);

    expect(response.statusCode).toEqual(200);
    expect(response.body.titulo).toBe(body.titulo);
  });

  test("Deve excluir uma tarefa", async () => {
    const response = await request(app)
      .delete(`/api/v1/task/${this.taskId}`)
      .set("Authorization", this.token);

    expect(response.statusCode).toEqual(204);
  });
});
