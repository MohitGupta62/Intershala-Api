const express = require("express");
const router = express();
const {
    homepage, 
    studentsignup, 
    studentsignin, 
    studentsignout, 
    currentUser, 
    studentsendmail,
    studentforgetlink,
    studentresetpassword,
    studentupdate,
    studentavatar, 
} = require("../controllers/indexController");

const { isAuthenticated } = require("../middlewares/authenticate");

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

//Get /student/forget-link/:studentid      //Reset password ka route
router.get("/student/forget-link/:id", studentforgetlink );

//Post /student/reset-password/:studentid      //Reset password ka route
router.post("/student/reset-password/:id", isAuthenticated, studentresetpassword );

//Post /student/update/:studentid  
router.post("/student/update/:id", isAuthenticated, studentupdate );

//Post /student/avatar/:studentid   //avatar route image ko upload krne ke liye bana hai 
router.post("/student/avatar/:id", isAuthenticated, studentavatar);

module.exports = router;