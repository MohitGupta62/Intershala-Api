const express = require("express");
const {
    homepage, 
    studentsignup, 
    studentsignin, 
    studentsignout, 
    currentUser, 
    studentsendmail,
    studentforgetlink,
    studentresetpassword, 
} = require("../controllers/indexController");

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

//Post /student/send-mail      //forgot password through email
router.post("/student/send-mail", studentsendmail);

//Get /student/forget-link:studentid      //Reset password ka route
router.get("/student/forget-link/:id", studentforgetlink );

//Post /student/reset-password:studentid      //Reset password ka route
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword );

module.exports = router;