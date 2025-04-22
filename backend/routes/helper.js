const express = require("express");
const tutorialModel = require("../models/tutorialModel");
const helperRouter = express.Router();

helperRouter.get("/api/tutorials/all", async (req, res) => {
  const tutorial = await tutorialModel.find();
  return res.status(200).json({ signal: "Api Working", tutorial });
});
module.exports = helperRouter;
