const { Router } = require("express");
const { check } = require("express-validator");

const { isValidateRole, hasEmail, hasId } = require("../helpers/db-validators");

const {
  validateFields,
  validateJWT,
  adminRole,
  hasRole,
} = require("../middlewares");

const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users");

const router = Router();

router.get("/", getUsers);
router.post(
  "/",
  [
    check("email", "El email no es válido").isEmail(),
    check("email").custom(hasEmail),
    check(
      "password",
      "El password debe de ser igual o mayor que 6 letras"
    ).isLength({ min: 6 }),
    check("username", "El nombre es obligatorio").not().isEmpty(),
    //check("role", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("role").custom(isValidateRole),
    validateFields,
  ],
  postUsers
);
router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(hasId),
    check("role").custom(isValidateRole),
    validateFields,
  ],
  putUsers
);
router.delete(
  "/:id",
  [
    validateJWT,
    // adminRole,
    hasRole("ADMIN_ROLE", "SALES_ROLE", "OTHER_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(hasId),
    validateFields,
  ],
  deleteUsers
);
router.patch("/", patchUsers);

module.exports = router;
