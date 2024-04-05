// const { validationResult } = require("express-validator");

const bcrypt = require('bcrypt');
const con = require("../config/dbConnection");

// const randomstring = require("randomstring");
const sendMail = require("../helpers/sendmail");

// const forgetpassword = (req, resp) => {
//     console.log(req.body);
//     let email = req.body.email;

//     //const errors = validationResult(req);
//     /* if (!errors.isEmpty()) {
//         return resp.status(400).json({ errors: errors.array() });
//     } */



//     con.query(

//         `SELECT * FROM login WHERE LOWER(email) = LOWER(${con.escape(email)});`,


//         (err, results) => {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 console.log("in else of forgetpassword");
//                 const password = String(Date.now());
//                 console.log(typeof (password));
//                 let mailsubject = "Mail Verification";
//                 // const randomToken = randomstring.generate();
//                 let content = '<p>Hii ' + email + '</p>' + '<h1> Now Your password is' + password + '</h1>';

//                 con.query('update login set password=? WHERE email=? ', [password, email], (err, result) => {
//                     if (err) {
//                         console.log(err);
//                         return resp.status(400).send({
//                             msg: "My error"
//                         })
//                     }
//                     else {
//                         sendMail(email, mailsubject, content);
//                     }
//                 })
//                 // sendMail(email, mailsubject, content);

//                 // con.query("update customers set token=? WHERE email=?",[randomToken,email],(err,result)=>{
//                 //     if(err){
//                 //         console.log(err);
//                 //         return resp.status(400).send({
//                 //             msg:err
//                 //         });  
//                 //     }
//                 // });


//                 // return resp.json({ Status: "success" });
//                 return resp.status(200).send({
//                     msg: "The user has been registered with us"
//                 });
//             }
//         });
// }

const forgetpassword = (req, res) => {
    const email = req.body.email;

    // Check if the email exists in the database
    con.query('SELECT * FROM login WHERE email = ?', [email], (err, result) => {
        if (err) {
            console.error('Error checking email in database:', err);
            return res.status(500).json({ msg: 'An error occurred while checking email in database' });
        }

        if (result.length === 0) {
            // If the email does not exist, return an error
            return res.status(404).json({ msg: 'Email not found' });
        }

        // Generate a new random password
        const newPassword = generateRandomPassword();

        // Send an email to the user with the new password and options to accept or reject
        const resetPasswordURL = `http://localhost:7000/api/resetpassword?email=${email}&newPassword=${newPassword}`;
        const mailSubject = 'Password Reset';
        const mailContent = `Dear User,<br><br>You requested to reset your password. Your new password is: ${newPassword}<br><br>
            <a href="${resetPasswordURL}&action=accept">Accept</a>
            <a href="${resetPasswordURL}&action=reject">Reject</a><br><br>
            If you did not request this change, please ignore this email.<br><br>Best regards, Your Application Team`;
        sendMail(email, mailSubject, mailContent);

        return res.status(200).json({ msg: 'An email has been sent to your email address with instructions to reset your password' });
    });
};

const resetpassword = (req, res) => {
    const { email, newPassword, action } = req.query;

    if (action === 'accept') {
        // Update password in login table
        con.query('UPDATE login SET password = ? WHERE email = ?', [newPassword, email], (err1, result1) => {
            if (err1) {
                console.error('Error updating password in login table:', err1);
                return res.status(500).json({ msg: 'An error occurred while updating password in login table' });
            }

                return res.send('Password has been successfully updated');
            
        });
    } else if (action === 'reject') {
        // Handle rejection action
        return res.send('Password reset rejected');
    } else {
        // Invalid action
        return res.status(400).json({ msg: 'Invalid action' });
    }
};

module.exports = { forgetpassword, resetpassword };

function generateRandomPassword() {
    // Generate a random password (you can customize this according to your requirements)
    return Math.random().toString(36).slice(-8);
}
