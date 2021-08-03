const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");
const { validarJWT, esAdminRole } = require("../middlewares");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Obtener todas las categorias -Publico
router.get("/", obtenerCategorias);

//Obtener una categorias por id - Publico
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo Válido").isMongoId(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  obtenerCategoria
);

//crear categoria - Privado - cualquier persona con token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Actualizar categoria - Privado - cualquier persona con token válido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoria),
    validarCampos,
  ],
  actualizarCategoria
);

//Eliminar categoría - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo Válido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoria),
  ],
  borrarCategoria
);
module.exports = router;
