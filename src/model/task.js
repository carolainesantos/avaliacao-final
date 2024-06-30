const database = require("../config/database");

class Tasks {
  constructor() {
    this.model = database.db.define("tasks", {
      id: {
        type: database.db.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: database.db.Sequelize.STRING,
        validate: {
          len: {
            args: [1, 100],
          },
        },
      },
      descricao: {
        type: database.db.Sequelize.STRING,
      },
      concluidoEm: {
        type: database.db.Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: database.db.Sequelize.STRING,
        allowNull: false,
        defaultValue: "pendente",
        validate: {
          isIn: [["pendente", "em andamento", "concluído"]],
        },
      },
      projetoId: {
        type: database.db.Sequelize.INTEGER,
        references: {
          model: "projects",
          key: "id",
        },
      },
    });
  }
}

module.exports = new Tasks().model;
