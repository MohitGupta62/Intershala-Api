const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");
const Student = require("../models/studentModel");
const { v4: uuidv4 } = require('uuid'); 

exports.resume = catchAsyncErrors (async (req, res, next) => {
    const {resume} = await Student.findById(req.id).exec();
    res.json({message: "Secure Resume Page!", resume});
});

//--------------------------- Education -------------------------------------

exports.addeducation = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({...req.body, id: uuidv4()}); //student ke education model me push kar diye
    //uuidv4 me ek random id generate hogi 
    await student.save();
    res.json({message: "Education Added!"});
});

exports.editeducation = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(
        // check karnege kya i equal hai equ.id ke or eduation ke id
        i => i.id === req.params.eduid
    );
    student.resume.education[eduIndex] = {
        ...student.resume.education[eduIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Education Updated!"});
});

exports.deleteeducation = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededuation = student.resume.education.filter(
        // check karnege i equal nahi hai equ.id ke or eduation ke id
        i => i.id !== req.params.eduid
    );
    student.resume.education = filterededuation;
    await student.save();
    res.json({message: "Education Deleted!"});
});

//--------------------------- Jobs -------------------------------------

exports.addjob = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.jobs.push({...req.body, id: uuidv4()}); //student ke jobs model me push kar diye
    //uuidv4 me ek random id generate hogi 
    await student.save();
    res.json({message: "Job Added!"});
});

exports.editjob = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex(
        // check karnege kya i equal hai job.id ke or jobs ke id
        i => i.id === req.params.jobid
    );
    student.resume.jobs[jobIndex] = {
        ...student.resume.jobs[jobIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Job Updated!"});
});

exports.deletejob = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterjob = student.resume.jobs.filter(
        // check karnege i equal nahi hai equ.id ke or eduation ke id
        i => i.id !== req.params.jobid
    );
    student.resume.jobs = filterjob;
    await student.save();
    res.json({message: "Job Deleted!"});
});

//--------------------------- Internship -------------------------------------

exports.addinternship = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({...req.body, id: uuidv4()}); //student ke internships model me push kar diye
    //uuidv4 me ek random id generate hogi
    await student.save();
    res.json({message: "Internships Added!"});
});

exports.editinternship = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const intershipIndex = student.resume.internships.findIndex(
        // check karnege kya i equal hai intern.id ke or internships ke id
        i => i.id === req.params.internid
    );
    student.resume.internships[intershipIndex] = {
        ...student.resume.internships[intershipIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Internships Updated!"});
});

exports.deleteinternship = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterinternship = student.resume.internships.filter(
        // check karnege i equal nahi hai intern.id ke or Internship ke id
        i => i.id !== req.params.internid
    );
    student.resume.internships = filterinternship;
    await student.save();
    res.json({message: "Internships Deleted!"});
});

//--------------------------- Responsibilities -------------------------------------

exports.addresponsibilities = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({...req.body, id: uuidv4()}); //student ke responsibilities model me push kar diye
    //uuidv4 me ek random id generate hogi
    await student.save();
    res.json({message: "Responsibilities Added!"});
});

exports.editresponsibilities = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const responsIndex = student.resume.responsibilities.findIndex(
        // check karnege kya i equal hai respons.id ke or responsibilities ke id
        i => i.id === req.params.responsid
    );
    student.resume.responsibilities[responsIndex] = {
        ...student.resume.responsibilities[responsIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Responsibilities Updated!"});
});

exports.deleteresponsibilities = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterresponsibilitie = student.resume.responsibilities.filter(
        // check karnege i equal nahi hai respons.id ke or Responsibilities ke id
        i => i.id !== req.params.responsid
    );
    student.resume.responsibilities = filterresponsibilitie;
    await student.save();
    res.json({message: "Responsibilities Deleted!"});
});

//--------------------------- Courses -------------------------------------

exports.addcourses = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({...req.body, id: uuidv4()}); //student ke courses model me push kar diye
    //uuidv4 me ek random id generate hogi
    await student.save();
    res.json({message: "Courses Added!"});
});

exports.editcourses = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const coursesIndex = student.resume.courses.findIndex(
        // check karnege kya i equal hai courses.id ke or courses ke id
        i => i.id === req.params.coursesid
    );
    student.resume.courses[coursesIndex] = {
        ...student.resume.courses[coursesIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Courses Updated!"});
});

exports.deletecourses = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filtercourses = student.resume.courses.filter(
        // check karnege i equal nahi hai courses.id ke or courses ke id
        i => i.id !== req.params.coursesid
    );
    student.resume.courses = filtercourses;
    await student.save();
    res.json({message: "Courses Deleted!"});
});

//--------------------------- Projects -------------------------------------

exports.addprojects = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({...req.body, id: uuidv4()}); //student ke projects model me push kar diye
    //uuidv4 me ek random id generate hogi
    await student.save();
    res.json({message: "Projects Added!"});
});

exports.editprojects = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projectsIndex = student.resume.projects.findIndex(
        // check karnege kya i equal hai projects.id ke or projects ke id
        i => i.id === req.params.projectsid
    );
    student.resume.projects[projectsIndex] = {
        ...student.resume.projects[projectsIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Projects Updated!"});
});

exports.deleteprojects = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterprojects = student.resume.projects.filter(
        // check karnege i equal nahi hai projects.id ke or projects ke id
        i => i.id !== req.params.projectsid
    );
    student.resume.projects = filterprojects;
    await student.save();
    res.json({message: "Projects Deleted!"});
});

//--------------------------- Skills -------------------------------------

exports.addskills = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({...req.body, id: uuidv4()}); //student ke skills model me push kar diye
    //uuidv4 me ek random id generate hogi
    await student.save();
    res.json({message: "Skills Added!"});
});

exports.editskills = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skillsIndex = student.resume.skills.findIndex(
        // check karnege kya i equal hai skills.id ke or skills ke id
        i => i.id === req.params.skillsid
    );
    student.resume.skills[skillsIndex] = {
        ...student.resume.skills[skillsIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Skills Updated!"});
});

exports.deleteskills = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterskills = student.resume.skills.filter(
        // check karnege i equal nahi hai skills.id ke or skills ke id
        i => i.id !== req.params.skillsid
    );
    student.resume.skills = filterskills;
    await student.save();
    res.json({message: "Skills Deleted!"});
});

//--------------------------- Accomplishments -------------------------------------

exports.addacco = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.acco.push({...req.body, id: uuidv4()}); //student ke acco model me push kar diye
    //uuidv4 me ek random id generate hogi
    await student.save();
    res.json({message: "Acco Added!"});
});

exports.editacco = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const accoIndex = student.resume.acco.findIndex(
        // check karnege kya i equal hai acco.id ke or accomplishments ke id
        i => i.id === req.params.accoid
    );
    student.resume.acco[accoIndex] = {
        ...student.resume.acco[accoIndex],
        ...req.body
    };
    await student.save();
    res.json({message: "Acco Updated!"});
});

exports.deleteacco = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteracco = student.resume.acco.filter(
        // check karnege i equal nahi hai acco.id ke or acco ke id
        i => i.id !== req.params.accoid
    );
    student.resume.acco = filteracco;
    await student.save();
    res.json({message: "Acco Deleted!"});
});
