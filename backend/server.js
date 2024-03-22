require("dotenv").config();
const con = require("./config/dbConnection");
let express = require("express");
const cors = require("cors");



const userRouter = require("./routes/userRoute");



// const cookieParser = require("cookie-parser");



const app = express();
const port = 7000;


app.use(express.json());
app.use(cors());
// app.use(cookieParser());




app.use("/public/images",express.static("./public/images"))
app.use("/api",userRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// let bcrypt = require('bcrypt')
// let pwd="12345";
// let pwd2="12345";

// bcrypt.genSalt(10,(err,salt)=>{
//     bcrypt.hash(pwd,salt, (err, hash) =>{

//         bcrypt.compare(pwd2,hash,function(err,res){
//             // console.log(pwd2);
//             // console.log(hash);
//             console.log(res);
//         })
//         // console.log(hash);
//     });

// })


