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
router.post("/avatar/:id", isAuthenticated, );

module.exports = router;