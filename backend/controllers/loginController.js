const con = require("../config/dbConnection");
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

// const login =  (req, resp) => {
    // const { email, pwd } = req.body;
//     let email = req.body.email;
//     const pwd = req.body.pwd;
    // let pwd = (req.body.pwd,10);
    
//     console.log(pwd);

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         return resp.status(400).json({ errors: errors.array() });
//     }

//     let query = `SELECT * FROM login WHERE email = ?`;
  
//     con.query(query, [email], async (err, results) => {
//       if (err) throw err;
  

//       if(!results.length){
//         return resp.status(401).send({
//           msg:"email or passsord is incorrect"
//         })
//       }

//         bcrypt.compare(pwd, results[0].password), (error, isMatch)=> {
//           if(error){
//             return resp.status(400).send({
//               msg:error
//             });
//           }
//           if(isMatch){
//             console.log(JWT_SECRET);
//           }
//         }
        
//         console.log(isMatch);
//         console.log(results[0].password);
//         return resp.status(401).send({
//           msg:"email or pwd is incorrect"
//         })
//     });
//   };
  

// module.exports = {
//     login
// }

const login =  async(req, resp) => {
    const { email, pwd } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }
  
    // Query to fetch user from login table
    let query = `SELECT * FROM login WHERE email = ${con.escape(email)};`;
  
    con.query(query, [email] , async (err, results) => {
      if (err) throw err;

      console.log(pwd);
  
      if (results.length > 0) {
        const user = results[0];
        // Compare hashed pwd with input pwd
        const ispwdMatch = await bcrypt.compare(pwd, user.password);
  
        if (ispwdMatch) {
          resp.status(200).json({ 
            message: 'Login successful!',
            role: user.role // Send the user type in the response
          });
        } else {
          console.log(user.password);
          console.log(ispwdMatch);
          resp.status(401).json({ message: 'Invalid credentials hi!' });
        }
      } else {
        resp.status(401).json({ message: 'Invalid credentials!' });
      }
    });
  };

//   module.exports = {
//     login
// }

  
  