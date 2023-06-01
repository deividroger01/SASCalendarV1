require("dotenv").config({ path: __dirname + "/.env" });
const router = require("express").Router();
require("../controllers/gAuthController");
const passport = require("passport");

//Funções

router.route("/login/success").get((req, res) => {
  if (req.user) {
    console.log(req.user);
    res.status(200).json({
      error: false,
      message: "Autenticação com o Google realizada com sucesso!",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Acesso não autorizado!",
    });
  }
});

router.route("/login/failed").get((req, res) => {
  res.status(401).json({
    error: true,
    message: "Autenticação com o Google falhou!",
  });
});

router.route("/auth/google/redirect").get(
  passport.authenticate("google", {
    successRedirect: `${process.env.CLIENT_URL}`,
    failureRedirect: "/login/failed",
  })
);

router.route("/auth/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/logout").get((req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
