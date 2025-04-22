var express = require("express");
const {
  signUp,
  login,
  createProj,
  saveProject,
  getProjects,
  getProject,
  deleteProject,
  editProject,
  getUserName,
} = require("../controllers/usercontroller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/username",getUserName);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/createProj", createProj);
router.post("/saveProject", saveProject);
router.post("/getProjects", getProjects);
router.post("/getProject", getProject);
router.post("/deleteProject", deleteProject);
router.post("/editProject", editProject);

module.exports = router;
