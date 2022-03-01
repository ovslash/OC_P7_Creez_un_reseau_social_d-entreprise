// logique métier appliquée aux routes user

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models/index");
const { user } = db.sequelize.models;

//--------------------------------------------------------------------------------------

// token et userID
const newToken = (user) => {
  token = jwt.sign(
    { userId: user.id, isAdmin: user.admin },
    `${process.env.JWT_KEY}`,
    { expiresIn: "24h" }
  );
  return { user, userId: user.id, isAdmin: user.admin, token };
};

//--------------------------------------------------------------------------------------

// logique métier pour l'enregistrement d'un utilisateur
exports.signup = (req, res, next) => {
  // hash du mot de passe
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      user
        .create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        })

        .then((user) => {
          res.status(201).json(newToken(user));
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//--------------------------------------------------------------------------------------

// logique métier pour la connexion d'un utilisateur
exports.login = (req, res, next) => {
  user
    .findOne({
      where: { email: req.body.email },
    })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(201).json(newToken(user));
        })

        .catch((error) => res.status(500).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};
