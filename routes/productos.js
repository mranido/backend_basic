const { Router } = require("express");
const { check } = require("express-validator");
const {
  actualizarProducto,
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  borrarProducto,
} = require("../controllers/productos");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validarJWT, esAdminRole } = require("../middlewares");

const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

//Obtener todas las productos -Publico
router.get("/", obtenerProductos);

//Obtener una producto por id - Publico
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo Válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  obtenerProducto
);

//crear producto - Privado - cualquier persona con token válido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id de Mongo").isMongoId(),
    check("categoria").custom(existeCategoria),
    validarCampos,
  ],
  crearProducto
);

//Actualizar producto - Privado - cualquier persona con token válido
router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "No es un id de Mongo").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  actualizarProducto
);

//Eliminar producto - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id de mongo Válido").isMongoId(),
    check("id").custom(existeProducto),
    validarCampos,
  ],
  borrarProducto
);
module.exports = router;
