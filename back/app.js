// application express

const express = require("express");

const app = express();

// import routes
const userRoutes = require("./routes/user");
// const postsRoutes = require('./routes/XXXXX');
// const likesRoutes = require('./routes/XXXXX');
// const commentsRoutes = require('./routes/XXXXX');

const path = require("path");

// transformation corps requete en objet JS
app.use(express.json());

// résolution problème de CORS et accès à l'API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// pour la gestion statique - images
app.use("/images", express.static(path.join(__dirname, "images")));

// routes utilisées
app.use("/api/auth", userRoutes);
// app.use('/api/posts', XXXXX);
// app.use('/api/posts', XXXXX);
// app.use('/api/posts', XXXXX);

//--------------------------------------------------------------

module.exports = app;
