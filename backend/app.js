const createError = require("http-errors");
const express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const connectDB = require("./config/db");
const tutorialModel = require("./models/tutorialModel");
const temp = require("./routes/temp");
const helperRouter = require("./routes/helper");
const tutorialRouter = require("./routes/temp");
delete require.cache[require.resolve("./routes/temp")];
delete require.cache[require.resolve("./controllers/tutorial")];

connectDB();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(helperRouter);

app.use("/", indexRouter);
app.use(tutorialRouter);
app.use("/rcd", temp);
app.use("/users", usersRouter);
app.get("/api/tutorials/getAllTut", async (req, res) => {
  try {
    let tut = await tutorialModel.find();
    return res.status(200).json({ success: "hain chal gaya", tut: tut });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
});

delete require.cache[require.resolve("./routes/temp")];
delete require.cache[require.resolve("./controllers/tutorial")];

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
