const { response, request } = require("express");

const getUsers = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;
  res.json({ msg: "get API", q, nombre, apikey, page, limit });
};

const postUsers = (req, res = response) => {
  const { nombre, edad } = req.body;
  res.status(201).json({ msg: "post API", nombre, edad });
};

const putUsers = (req, res = response) => {
  const id = req.params.id;
  res.status(500).json({ msg: "put API", id });
};

const deleteUsers = (req, res) => {
  res.json({ msg: "delete API" });
};

const patchUsers = (req, res) => {
  res.json({ msg: "delete API" });
};

module.exports = { getUsers, postUsers, putUsers, deleteUsers, patchUsers };
