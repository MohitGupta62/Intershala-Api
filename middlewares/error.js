exports.genetatedErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;


    //yadi error me duplicate key aata hai to err.message print ho jayga
    if(
        err.name === "MongoServerError" && //err ka name hai MongoServerError
        err.message.includes("E11000 duplicate key ") //yadi aisa msg aata hai to 
    ){
        err.message = "Student with this email address already exists"; //ye print ho jayga
    }


    res.status(statusCode).json({
        message: err.message,
        errName: err.name,
        stack: err.stack, //error ko stack me dikhata hai
    });
};