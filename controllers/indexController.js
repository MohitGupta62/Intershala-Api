const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");


exports.homepage = catchAsyncErrors (async (req, res, next) => {
    res.json({message: "homepage"});
});

exports.studentsignup = catchAsyncErrors (async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res)
});

exports.studentsignin = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findOne({email: req.body.email})
    .select("+password")
    .exec();

    if(!student) //student ka email match nhi hua to ye code chalega
        return next(
        new ErrorHandler("User not found with this email address", 404)
        );
    
    //student ka password yadi glt hoga to ye code chlega aur error aa jayga
    const isMatch = student.comparepassword(req.body.password);   
    if(!isMatch) return next(new ErrorHandler("Wrong Password", 500));

    sendtoken(student, 200, res)
});

exports.studentsignout = catchAsyncErrors (async (req, res, next) => {
    
});