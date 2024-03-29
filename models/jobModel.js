//ye folder me Job ka schema hai jisase job create & read hoga

const mongoose = require("mongoose");

const jobModel = new mongoose.Schema({
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    }],
    employe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "jobs"
    },
    title: String,
    skills: String,
    jobtype: {
        type: String,
        enum: ["In office", "Remote"]
    },
    openings: Number,
    description: String,
    perferences: String,
    salary: Number,
    perks: String,
    assesments: String,  
},{timestamps: true});


const Job = mongoose.model("job", jobModel)
module.exports = Job;