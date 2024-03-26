require("dotenv").config({path: "./.env"});
const express = require("express");
const app = express();

//db connection
require("./models/database").connectDatabase();

//logger
const logger = require("morgan");
app.use(logger("tiny"));
//bodyparser ko hamesa logger ke niche likhte hai
// bodyparser
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// session and cookie
// cookie - cookie ka ek code hota hai jo browser me save rhta hai jisase user login rhta hai website ko band karne ke baad bhi
// session - session wo hota hai jo browser me some times ke liye rhata yadi expire ho gya to logout ho jayga user
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieParser());


//routes
app.use("/", require("./routes/indexRoutes"));

//error handling
const ErrorHandler = require("./utils/ErrorHandler");
const {genetatedErrors} = require("./middlewares/error");

app.all("*", (req, res, next) =>{
    next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));  //next kaam krta hai jo error ho ise bahar fek dena

})
app.use(genetatedErrors)



app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`));