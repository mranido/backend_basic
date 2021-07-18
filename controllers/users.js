const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.js");

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(Number(limit)).skip(Number(from)),
  ]);

  res.json({ total, users });
};

const postUsers = async (req, res = response) => {
  const { username, email, password, role } = req.body;
  const user = new User({ username, email, password, role });

  //Verificar que el correo existe

  //Encriptar la contraseña

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  //Guardar en BD

  await user.save();
  res.status(201).json({ user });
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;

  const { _id, password, google, email, ...resto } = req.body;

  //TODO VALIDAR contra la BD

  if (password) {
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.status(500).json({ msg: "put API", user });
};

const deleteUsers = async (req, res) => {
  const { id } = req.params;

  //Borrado Físicamente

  //const user = await User.findByIdAndDelete(id);

  //Borrado Lógico

  const user = await User.findByIdAndUpdate(id, { state: false });

  const authenticUser = req.user;
  res.json({ user, authenticUser });
};

const patchUsers = (req, res) => {
  res.json({ msg: "delete API" });
};

module.exports = { getUsers, postUsers, putUsers, deleteUsers, patchUsers };
