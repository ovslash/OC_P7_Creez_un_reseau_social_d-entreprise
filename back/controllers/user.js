// logique métier appliquée aux routes user

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models/index");
const { User } = db.sequelize.models;

//--------------------------------------------------------------------------------

// logique métier pour l'enregistrement d'un utilisateur
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//--------------------------------------------------------------------------------
