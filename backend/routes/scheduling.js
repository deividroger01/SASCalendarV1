const router = require("express").Router();
const schedulingController = require("../controllers/schedulingController");

// Funções
router
  .route("/scheduling")
  .post((req, res) => schedulingController.create(req, res));

router
  .route("/scheduling")
  .get((req, res) => schedulingController.getAll(req, res));

router
  .route("/scheduling/:id")
  .get((req, res) => schedulingController.get(req, res));

router
  .route("/scheduling/:id")
  .delete((req, res) => schedulingController.delete(req, res));

router
  .route("/scheduling/:id")
  .put((req, res) => schedulingController.update(req, res));

module.exports = router;
