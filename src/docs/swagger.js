const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "Documentação da API usando Swagger com Express",
    },
  },
  apis: [
    "./src/routes/user.js",
    "./src/routes/project.js",
    "./src/routes/task.js",
  ],
});

module.exports = swaggerSpec;
