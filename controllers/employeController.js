const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const Employe = require("../models/employeModel")
const ErrorHandler = require("../utils/ErrorHandler");
const { sendtoken } = require("../utils/SendToken"); 
const {sendmail} = require("../utils/nodeMailer");
const imageKit = require("../utils/imageKit").initImageKit();
const path = require("path");


exports.homepage = catchAsyncErrors (async (req, res, next) => {
    res.json({message: "Secure Employe Homepage!"});
});

exports.currentEmploye = catchAsyncErrors (async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
    res.json({employe});
});

exports.employesignup = catchAsyncErrors (async (req, res, next) => {
    const employe = await new Employe(req.body).save();
    sendtoken(employe, 201, res)
});

exports.employesignin = catchAsyncErrors (async (req, res, next) => {
    const employe = await Employe.findOne({email: req.body.email})
    .select("+password")
    .exec();

    if(!employe) //employe ka email match nhi hua to ye code chalega
        return next(
        new ErrorHandler("Employe not found with this email address", 404)
        );
    
    //employe ka password yadi glt hoga to ye code chlega aur error aa jayga
    const isMatch = employe.comparepassword(req.body.password);   
    if(!isMatch) return next(new ErrorHandler("Wrong Password", 500));

    sendtoken(employe, 200, res)
});

exports.employesignout = catchAsyncErrors (async (req, res, next) => {
    res.clearCookie("token"); 
    res.json({message: 'Successfully signout!'})
});

//forgot password through email, ka controller hai
exports.employesendmail = catchAsyncErrors (async (req, res, next) => {
    const employe = await Employe.findOne({email: req.body.email}).exec();

    if(!employe) //employe ka email match nhi hua to ye code chalega
        return next(
        new ErrorHandler("User not found with this email address", 404)
        );
    
    //54. password ko forgot karne ke liye ek link generate karta hai jo email par send hoga
    const url = `${req.protocol}://${req.get("host")}/employe/forget-link/${
        employe._id
    }`

    sendmail(req, res, next, url);

    // password reset ka link ek hii baar kaam kare isliye ye code likhe hai
    employe.resetPasswordToken = "1";
    await employe.save();

    res.json({employe, url})
});

// Link se new password banaynge uske liye code hai
exports.employeforgetlink = catchAsyncErrors (async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();

    if(!employe)
        return next(
        new ErrorHandler("Employe not found with this email address", 404)
        );
        if(employe.resetPasswordToken == "1"){
            employe.resetPasswordToken == "0"
            employe.password = req.body.password;
            await employe.save();
        }else{
            return next(
                new ErrorHandler("Invalid Reset Password Link! Please try again", 500)
            );
        }
        res.status(200).json({
            message: "Password has been Successfully Changed"
        })
});

exports.employeresetpassword = catchAsyncErrors (async (req, res, next) => {
    const employe = await Employe.findById(req.id).exec();
        employe.password = req.body.password;
        await employe.save();
        sendtoken(employe, 201, res)
});

exports.employeupdate = catchAsyncErrors (async (req, res, next) => {
 await Employe.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "employe Updated Successfully",
    })
});

//image ko upload krne ka code hai
exports.employeavatar = catchAsyncErrors (async (req, res, next) => {
    const employe = await Employe.findById(req.params.id).exec();
    const file = req.files.organizationlogo;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;
    
    // if - Condition check karge yadi phle se hii file hai organizationlogo me to
    // delete kar ke new file add kr dega organizationlogo me
    if(employe.organizationlogo.fileId !== ""){
        await imageKit.deleteFile(employe.organizationlogo.fileId); 
    }

    const {fileId, url} = await imageKit.upload({
        file: file.data,
        fileName: modifiedFileName,
    })
    employe.organizationlogo ={fileId, url};
    await employe.save();
    res.status(200).json({
        success: true,
        message: "Profile updated!",
    })
    res.json({image})
   });