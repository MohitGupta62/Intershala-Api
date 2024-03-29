const express = require("express");
const router = express();
const { resume,
        addeducation,
        editeducation,
        deleteeducation,
        addjob,
        editjob,
        deletejob,
        addinternship,
        editinternship,
        deleteinternship,
        addresponsibilities,
        editresponsibilities,
        deleteresponsibilities,
        addcourses,
        editcourses,
        deletecourses,
        addprojects,
        editprojects,
        deleteprojects,
        addskills,
        editskills,
        deleteskills,
} = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/authenticate");

//GET /
router.get("/", isAuthenticated, resume )

//--------------------------- Education -------------------------------------

//POST /add-edu
router.post("/add-edu", isAuthenticated, addeducation)

//POST /edit-edu/id
router.post("/edit-edu/:eduid", isAuthenticated, editeducation)

//POST /delete-edu/id
router.post("/delete-edu/:eduid", isAuthenticated, deleteeducation)

//--------------------------- jobs -------------------------------------

//POST /add-job
router.post("/add-job", isAuthenticated, addjob)

//POST /edit-job/id
router.post("/edit-job/:jobid", isAuthenticated, editjob)

//POST /delete-job/id
router.post("/delete-job/:jobid", isAuthenticated, deletejob)

//--------------------------- Internship -------------------------------------

//POST /add-intern
router.post("/add-intern", isAuthenticated, addinternship)

//POST /edit-intern/id
router.post("/edit-intern/:internid", isAuthenticated, editinternship)

//POST /delete-intern/id
router.post("/delete-intern/:internid", isAuthenticated, deleteinternship)

//--------------------------- Responsibilities -------------------------------------

//POST /add-intern
router.post("/add-respon", isAuthenticated, addresponsibilities)

//POST /edit-intern/id
router.post("/edit-respon/:responsid", isAuthenticated, editresponsibilities)

//POST /delete-intern/id
router.post("/delete-respon/:responsid", isAuthenticated, deleteresponsibilities)

//----------------------------- Courses -------------------------------------

//POST /add-course
router.post("/add-course", isAuthenticated, addcourses)

//POST /edit-course/id
router.post("/edit-course/:coursesid", isAuthenticated, editcourses)

//POST /delete-course/id
router.post("/delete-course/:coursesid", isAuthenticated, deletecourses)

//----------------------------- Projects -------------------------------------

//POST /add-project
router.post("/add-project", isAuthenticated, addprojects)

//POST /edit-project/id
router.post("/edit-project/:projectsid", isAuthenticated, editprojects)

//POST /delete-project/id
router.post("/delete-project/:projectsid", isAuthenticated, deleteprojects)

//----------------------------- Skills -------------------------------------

//POST /add-skills
router.post("/add-skill", isAuthenticated, addskills)

//POST /edit-skills/id
router.post("/edit-skill/:skillsid", isAuthenticated, editskills)

//POST /delete-skills/id
router.post("/delete-skill/:skillsid", isAuthenticated, deleteskills)

//----------------------------- Accomplishments -------------------------------------

//POST /add-acco
router.post("/add-acco", isAuthenticated, addacco)

//POST /edit-accos/id
router.post("/edit-acco/:accoid", isAuthenticated, editacco)

//POST /delete-accos/id
router.post("/delete-acco/:accoid", isAuthenticated, deleteacco)

module.exports = router;