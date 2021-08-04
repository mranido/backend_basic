const validaCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");
const validarArchivo = require("../middlewares/validar-archivo");

module.exports = {
  ...validarArchivo,
  ...validaCampos,
  ...validarJWT,
  ...validaRoles,
};
