const router = require("express").Router();

// Service router
const serviceRouter = require("./service");

router.use("/", serviceRouter);

// Client router

const clientRouter = require("./client");

router.use("/", clientRouter);

// Service Provider router

const serviceProviderRouter = require("./serviceProvider");

router.use("/", serviceProviderRouter);

// Schedule router

const scheduleRouter = require("./schedule");

router.use("/", scheduleRouter);

// Scheduling router

const schedulingRouter = require("./scheduling");

router.use("/", schedulingRouter);

// Calendar router

const calendarRouter = require("./calendar");

router.use("/", calendarRouter);

// Report router

const reportRouter = require("./report");

router.use("/", reportRouter);

// GAuth router

const gAuthRouter = require("./gAuth");

router.use("/", gAuthRouter);

module.exports = router;
