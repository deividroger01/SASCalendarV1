const router = require("express").Router();

const scheduleController = require("../controllers/scheduleController");

// Funções
router
    .route("/schedule")
    .post((req, res) => scheduleController.create(req, res));

router
    .route("/schedule")
    .get((req, res) => scheduleController.getAll(req, res));

router
    .route("/schedule/:id")
    .get((req, res) => scheduleController.get(req, res));

router
    .route("/schedule/:id")
    .delete((req, res) => scheduleController.delete(req, res));

router
    .route("/schedule/:id")
    .put((req, res) => scheduleController.update(req, res));

module.exports = router;