const router = require("express").Router();

const reportController = require("../controllers/reportController");

// Funções
router
    .route("/report")
    .post((req, res) => reportController.create(req, res));

router
    .route("/report")
    .get((req, res) => reportController.getAll(req, res));

router
    .route("/report/:id")
    .get((req, res) => reportController.get(req, res));

router
    .route("/report/:id")
    .delete((req, res) => reportController.delete(req, res));

router
    .route("/report/:id")
    .put((req, res) => reportController.update(req, res));

module.exports = router;