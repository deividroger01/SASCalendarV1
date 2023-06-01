require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();

//listen for reqs
app.use(express.static("public"));

app.use(
  cookieSession({
    name: "session",
    keys: [`${process.env.COOKIE_SECRET}`],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE, OPTIONS",
    credentials: true,
  })
);

// DB Connection
const conn = require("./db/conn");

conn();

//body-parser
app.use(express.json());

//Routes
const routes = require("./routes/router");
app.use("/", routes);

//Server connection
const port = process.env.PORT || 5000;
const { now } = require("mongoose");
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port} às ${now()}`);
});
