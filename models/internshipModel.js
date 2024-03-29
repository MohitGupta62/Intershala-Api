//ye folder me Internship ka schema hai jisase internship create & delete hoga

const mongoose = require("mongoose");

const internshipModel = new mongoose.Schema({
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    }],
    employe: { //isase ye pata chalega kaun banaya h internships
        type: mongoose.Schema.Types.ObjectId,
        ref: "interships"
    },
    profile: String,
    skills: String,
    internshiptype: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibility: String,
    stipend: {
        status: {  
            type: String,
            enum: ["Fixed", "Negotiable", "Performance based", "Unpaid"],
        },
        amount: Number,
    },
    perks: String,
    assesments: String,  
},{timestamps: true});


const Internship = mongoose.model("internship", internshipModel)
module.exports = Internship;