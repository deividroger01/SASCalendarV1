const router = require("express").Router();
const jwt = require("jsonwebtoken");

const clientController = require("../controllers/clientController");

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const reqtoken = authHeader && authHeader.split(" ")[1];

  if (!reqtoken) {
    return res.status(401).json({ msg: "Acesso negado!" });
  }

  try {
    const secret = process.env.SECRET;

    jwt.verify(reqtoken, secret);

    next();
  } catch (error) {
    res.status(400).json({ msg: "Token inválido!" });
    console.log(error);
  }
}

// Funções
router.route("/client").post((req, res) => clientController.create(req, res));

router.route("/client").get((req, res) => clientController.getAll(req, res));

router
  .route("/client/:id")
  .get(checkToken, (req, res) => clientController.get(req, res));

router
  .route("/client/:id")
  .delete(checkToken, (req, res) => clientController.delete(req, res));

router
  .route("/client/:id")
  .put(checkToken, (req, res) => clientController.update(req, res));

module.exports = router;
