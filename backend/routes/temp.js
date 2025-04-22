const express = require("express");
const tutorialRouter = express.Router();
const { getTutorialsByLanguage } = require("../controllers/tutorial");

tutorialRouter.get("/:language", getTutorialsByLanguage);
tutorialRouter.get("/a", async (req, res) => {
  console.log("Helllo");
  return res.status(200).json({ success: true, message: "API is working!" });
});
//router.get("/bxsusbhx", tutorialController.getAll);

module.exports = tutorialRouter;
