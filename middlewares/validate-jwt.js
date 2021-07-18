const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

const validateJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }
  try {
    const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //leer el usuario que está en la BBDD

    const user = await Usuario.findById(uuid);

    if (!user) {
      return res.status(401).json({ msg: "Token no válido" });
    }

    //Verificar si el uuid tiene estado en true

    if (!user.state) {
      return res.status(401).json({ msg: "Token no válido" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
  console.log(token);
};

module.exports = { validateJWT };
