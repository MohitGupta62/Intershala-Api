//ye folder me student ka schema hai

const mongoose = require("mongoose");
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken");
const studentModel = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is requiredd"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
             'Please fill a valid email address'
        ],  //match kaam krta hai email ka validation check karne ke liye
            //email rejex mong oose Schema serach on google then copy and paste
    },
    password: {
        type: String,
        select: false, // ye kaam karta hai jab user ko find karte hai
                        // tab user ka password na dikhe
        maxLength: [15, "Password should not exceed more than 15 characters"],
        minLength: [6, "Password should have be atleast 6 characters"],
        //match: []
    },

},{timestamps: true});


//ye code se password na dikhe database me isliye bcrypt kar rhe hai
studentModel.pre("save", function(){
    if(!this.isModified("password")){ //ye is liye lga rhe kyuki jab password change hoga tb ye code chlega
        return;
    }
    let Salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, Salt);
});

studentModel.methods.comparepassword = function(password){ //isame comparepassword function se  password niklega bcrypt wala aur compare karega routes wala folder me
    return bcrypt.compareSync(password, this.password) 
}

studentModel.methods.getjwttoken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
    });
};  


const Student = mongoose.model("student", studentModel)
module.exports = Student;