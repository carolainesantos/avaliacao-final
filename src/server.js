const express = require("express");
const cors = require("cors");
const database = require("./config/database");

const UserApi = require("./api/user");

const UserRouter = require("./routes/user");
const ProjectRouter = require("./routes/project");
const TaskRouter = require("./routes/task");
const swaggerSpec = require("./docs/swagger");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// // Rotas sem token
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.post("/api/v1/login", UserApi.login);
app.post("/api/v1/user", UserApi.createUser);

// // Rotas com token
app.use(UserApi.validateToken);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/project", ProjectRouter);
app.use("/api/v1/task", TaskRouter);

database.db
  .sync({ force: false })
  .then((_) => {
    if (!process.env.TEST) {
      app.listen(3000, (_) => {
        console.log("Server running on port 3000");
      });
    }
  })
  .catch((e) => {
    console.error(`Erro ao inicializar o banco de dados ${e}`);
  });

module.exports = app;
