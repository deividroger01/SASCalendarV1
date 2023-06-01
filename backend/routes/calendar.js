const router = require("express").Router();
const calendarController = require("../controllers/calendarController");

// Funções
router.route("/event").post((req, res) => calendarController.create(req, res));

router
  .route("/event/freebusy")
  .post((req, res) => calendarController.freebusy(req, res));

router
  .route("/event/:id")
  .put((req, res) => calendarController.update(req, res));

router
  .route("/event/:id")
  .delete((req, res) => calendarController.delete(req, res));

// Não funcionam //

router.route("/event").get((req, res) => calendarController.getAll(req, res));

router.route("/event/:id").get((req, res) => calendarController.get(req, res));

module.exports = router;
