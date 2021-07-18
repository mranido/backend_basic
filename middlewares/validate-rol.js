const { response } = require("express");

const adminRole = (req, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: "Se quiere verificar el rol sin validar el token primero" });
  }

  const { username, role } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status("401").json({ msg: `${username} no es administrador` });
  }

  next();
};

const hasRole = (...role) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }
    if (!role.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de los siguiente roles: ${rol}`,
      });
    }
    next();
  };
};

module.exports = { adminRole, hasRole };
