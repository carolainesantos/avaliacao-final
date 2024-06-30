const app = require("../../src/server");
const request = require("supertest");

describe("Teste de api pra Projeto", () => {
  beforeAll(async () => {
    const body = { nome: "Teste", email: "projeto@teste.com", senha: 123 };
    const users = await request(app).post("/api/v1/user").send(body);
    this.id = users.body.id;
    const response = await request(app).post("/api/v1/login").send(body);
    this.token = response.body.token;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/api/v1/user/${this.id}`)
      .set("Authorization", this.token);
  });

  test("Post /api/v1/project", async () => {
    const body = {
      nome: "Projeto Teste",
      descricao: "Projetinho",
      usuarioId: this.id,
    };
    const response = await request(app)
      .post("/api/v1/project")
      .set("Authorization", this.token)
      .send(body);

    this.projetoId = response.body.id;

    expect(response.statusCode).toBe(201);
    expect(response.body.nome).toBe(body.nome);
    expect(response.body.descricao).toBe(body.descricao);
    expect(response.body.usuarioId).toBe(body.usuarioId);
  });

  test("Get /api/v1/project", async () => {
    const response = await request(app)
      .get("/api/v1/project")
      .set("Authorization", this.token);

    expect(response.statusCode).toBe(200);
  });

  test("Put /api/v1/project/:id", async () => {
    const body = { nome: "Projeto Teste Editado" };
    const response = await request(app)
      .put(`/api/v1/project/${this.projetoId}`)
      .set("Authorization", this.token)
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body.nome).toBe(body.nome);
  });

  test("Delete /api/v1/project/:id", async () => {
    const response = await request(app)
      .delete(`/api/v1/project/${this.projetoId}`)
      .set("Authorization", this.token);

    expect(response.statusCode).toBe(204);
  });
});
