const Role = require("../models/role");
const User = require("../models/user");

const isValidateRole = async (role = "") => {
  const hasRole = await Role.findOne({ role });
  if (!hasRole) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const hasEmail = async (email = "") => {
  const findEmail = await User.findOne({ email });

  if (findEmail) {
    throw new Error(`El correo ${email} ya está registrado en la BD`);
  }
};

const hasId = async (id = "") => {
  const findId = await User.findById(id);

  if (!findId) {
    throw new Error(`El id ${id} no está registrado en la BD`);
  }
};

module.exports = { isValidateRole, hasEmail, hasId };
