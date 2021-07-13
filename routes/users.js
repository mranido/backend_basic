const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
  patchUsers,
} = require("../controllers/users");

const { Router } = require("express");

const router = Router();

router.get("/", getUsers);
router.post("/", postUsers);
router.put("/:id", putUsers);
router.delete("/", deleteUsers);
router.patch("/", patchUsers);

module.exports = router;
