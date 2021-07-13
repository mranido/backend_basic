const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    //Middlewares
    this.middlewares();
    //Ruta de la aplicación
    this.routes();
  }

  middlewares() {
    this.app.use(cors());

    //lectura y parseo del body

    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Estoy escuchando al puerto", this.port);
    });
  }
}

module.exports = Server;
