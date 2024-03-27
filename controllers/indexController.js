const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken");
const {sendmail} = require("../utils/nodeMailer");


exports.homepage = catchAsyncErrors (async (req, res, next) => {
    res.json({message: "Secure Homepage!"});
});

exports.currentUser = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({student});
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
    res.clearCookie("token");
    res.json({message: 'Successfully signout!'})
});

//forgot password through email, ka controller hai
exports.studentsendmail = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findOne({email: req.body.email}).exec();

    if(!student) //student ka email match nhi hua to ye code chalega
        return next(
        new ErrorHandler("User not found with this email address", 404)
        );
    
    //54. password ko forgot karne ke liye ek link generate karta hai jo email par send hoga
    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${
        student._id
    }`

    sendmail(req, res, next, url);

    // password reset ka link ek hii baar kaam kare isliye ye code likhe hai
    student.resetPasswordToken = "1";
    await student.save();

    res.json({student, url})
});

// Link se new password banaynge uske liye code hai
exports.studentforgetlink = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();

    if(!student)
        return next(
        new ErrorHandler("User not found with this email address", 404)
        );
        if(student.resetPasswordToken == "1"){
            student.resetPasswordToken == "0"
            student.password = req.body.password;
            await student.save();
        }else{
            return next(
                new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
            );
        }
        res.status(200).json({
            message: "Password has been Successfully Changed"
        })
});

exports.studentresetpassword = catchAsyncErrors (async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
        student.password = req.body.password;
        await student.save();
        sendtoken(student, 201, res)
});