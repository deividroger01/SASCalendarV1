const router = require("express").Router();
const jwt = require('jsonwebtoken');

const serviceProviderController = require("../controllers/serviceProviderController");


function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const reqtoken = authHeader && authHeader.split(" ")[1];

    if (!reqtoken) {
        return res
            .status(401)
            .json({ msg: "Acesso negado!" });
    };

    try {
        const secret = process.env.SECRET;

        jwt.verify(reqtoken, secret);

        next();
    } catch (error) {
        res
            .status(400)
            .json({ msg: "Token inválido!" });
        console.log(error);
    };
};

// Funções
router
    .route("/serviceProvider/register")
    .post((req, res) => serviceProviderController.create(req, res));

router
    .route("/serviceProvider/login")
    .post((req, res) => serviceProviderController.login(req, res));

/*router
    .route("/serviceProvider")
    .get((req, res) => serviceProviderController.getAll(req, res));*/

router
    .route("/serviceProvider/:id")
    .get(checkToken, (req, res) => serviceProviderController.get(req, res));

router
    .route("/serviceProvider/:id")
    .delete(checkToken, (req, res) => serviceProviderController.delete(req, res));

router
    .route("/serviceProvider/:id")
    .put(checkToken, (req, res) => serviceProviderController.update(req, res));

module.exports = router;