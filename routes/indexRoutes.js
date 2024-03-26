const express = require("express");
const { homepage, studentsignup, studentsignin, studentsignout, } = require("../controllers/indexController");
const router = express();

//Get /
router.get("/", homepage)

//Post /student/signup
router.post("/student/signup", studentsignup);

//Post /student/signin
router.post("/student/signin", studentsignin );

//Get /student/signout
router.get("/student/signout", studentsignout);

module.exports = router;