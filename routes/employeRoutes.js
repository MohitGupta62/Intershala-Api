const express = require("express");
const router = express();
const {
    homepage,
    currentEmploye,
    employesignup,
    employesignin,
    employesignout,
    employesendmail,
    employeforgetlink,
    employeresetpassword,
    employeupdate,
    employeavatar,
    createinternship,
    readinternship,
    readsingleinternship,
    createjob,
    readjob,
    readsinglejob,
} = require("../controllers/employeController");

const { isAuthenticated } = require("../middlewares/authenticate");

//Get /
router.get("/", isAuthenticated, homepage)

//Post /current
router.post("/current", currentEmploye);

//Post /employe/signup
router.post("/signup", employesignup);

//Post /employe/signin
router.post("/signin", employesignin );

//Get /employe/signout
router.get("/signout",isAuthenticated, employesignout);

//Post /employe/send-mail      //forgot password through email
router.post("/send-mail", employesendmail);

//Get /employe/forget-link/:employeid      //Reset password ka route
router.get("/forget-link/:id", employeforgetlink);

//Post /employe/reset-password/:employeid      //Reset password ka route
router.post("/reset-password/:id", isAuthenticated, employeresetpassword);

//Post /employe/update/:employeid  
router.post("/update/:id", isAuthenticated, employeupdate);

//Post /employe/avatar/:employeid   //avatar route image ko upload krne ke liye bana hai 
router.post("/avatar/:id", isAuthenticated, employeavatar);



//--------------------------- Internship -------------------------

//Post /employe/internship/create  //Internship create hoga
router.post("/internship/create", isAuthenticated, createinternship);

//Post /employe/internship/read  //Internship ko read kargea
router.post("/internship/read", isAuthenticated, readinternship);

//Post /employe/internship/read/intershipid  //Single Internship ko read kargea
router.post("/internship/read/:id", isAuthenticated, readsingleinternship);


//--------------------------- Jobs -------------------------

//Post /employe/job/create  //job create hoga
router.post("/job/create", isAuthenticated, createjob );

//Post /employe/job/read  //job ko read kargea
router.post("/job/read", isAuthenticated, readjob);

//Post /employe/job/read/jobid  //Single job ko read kargea
router.post("/job/read/:id", isAuthenticated, readsinglejob);

module.exports = router;