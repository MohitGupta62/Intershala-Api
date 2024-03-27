const express = require("express");
const { homepage, studentsignup, studentsignin, studentsignout, currentUser, } = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/authenticate");
const router = express();

//Get /
router.get("/", isAuthenticated, homepage)

//Post /student
router.post("/student", isAuthenticated, currentUser)

//Post /student/signup
router.post("/student/signup", studentsignup);

//Post /student/signin
router.post("/student/signin", studentsignin );

//Get /student/signout
router.get("/student/signout",isAuthenticated, studentsignout);

module.exports = router;