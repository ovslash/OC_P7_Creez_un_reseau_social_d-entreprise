// logique métier appliquée aux routes user

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models/index");
const { User } = db.sequelize.models;

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
      User.create({
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
  User.findOne({
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

//--------------------------------------------------------------------------------------

// logique métier pour obtenir les informations d'un utilisateur
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.userId } })
    .then((user) => res.status(200).json({ user }))
    .catch((error) => res.status(404).json({ error }));
};

//--------------------------------------------------------------------------------------

// logique métier pour modifier les informations générales
exports.editUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (req.token.userId === user.id) {
      let userObject = req.body;
      if (req.body.password) {
        throw "vous ne pouvez pas modifier votre mot de passe ici, retirez le champ password";
      }
      if (req.files) {
        userObject = JSON.parse(req.body.user);
        userObject.profilePhoto = `${req.protocol}://${req.get(
          "host"
        )}/images/${req.files[0].filename}`;
      }

      await user.update(
        { ...userObject },
        { where: { id: req.params.userId } }
      );
      res.status(200).json({ message: "profil modifié !", user });
    } else {
      throw "vous n'êtes pas autorisé à modifier ce profil";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

//--------------------------------------------------------------------------------------

// logique métier pour modifier le mot de passe
exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (req.token.userId === user.id) {
      const passwordDecrypt = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      const newPasswordDecrypt = await bcrypt.compare(
        req.body.newPassword,
        user.password
      );

      if (!passwordDecrypt) {
        return res
          .status(400)
          .json({ error1: "Mot de passe actuel incorrect !" });
      } else if (newPasswordDecrypt) {
        return res.status(400).json({
          error: "Le nouveau mot de passe doit être différent de l'ancien",
        });
      } else {
        const hash = await bcrypt.hash(req.body.newPassword, 10);
        await user.update(
          { password: hash },
          { where: { id: req.params.userId } }
        );
        res.status(201).json({
          message:
            "mot de passe modifié, veuillez vous reconnecter avec votre nouvel identifiant !",
          user,
        });
      }
    } else {
      throw "vous n'êtes pas autorisé à modifier ce profil";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

//--------------------------------------------------------------------------------------

// logique métier pour supprimer l'utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (user.id === req.token.userId) {
      await user.destroy();
      res.status(200).json({ message: "profil utilisateur supprimé !" });
    } else {
      throw "vous n'êtes pas autorisé à supprimer cet utilisateur";
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
