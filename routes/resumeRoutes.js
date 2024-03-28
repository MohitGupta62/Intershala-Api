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

//POST /add-courses
router.post("/add-course", isAuthenticated, addcourses)

//POST /edit-courses/id
router.post("/edit-course/:coursesid", isAuthenticated, editcourses)

//POST /delete-courses/id
router.post("/delete-course/:coursesid", isAuthenticated, deletecourses)

//----------------------------- Projects -------------------------------------

//POST /add-projects
router.post("/add-project", isAuthenticated, addprojects)

//POST /edit-projects/id
router.post("/edit-project/:projectsid", isAuthenticated, editprojects)

//POST /delete-projects/id
router.post("/delete-project/:projectsid", isAuthenticated, deleteprojects)

module.exports = router;