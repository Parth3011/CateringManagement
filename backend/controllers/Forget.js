// const { validationResult } = require("express-validator");

const bcrypt = require('bcrypt');
const con = require("../config/dbConnection");

// const randomstring = require("randomstring");
const sendMail = require("../helpers/sendmail");

const forgetpassword = (req, resp) => {
    console.log(req.body);
    let email = req.body.email;

    //const errors = validationResult(req);
    /* if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    } */



    con.query(

        `SELECT * FROM login WHERE LOWER(email) = LOWER(${con.escape(email)});`,


        (err, results) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log("in else of forgetpassword");
                const password = String(Date.now());
                console.log(typeof (password));
                let mailsubject = "Mail Verification";
                // const randomToken = randomstring.generate();
                let content = '<p>Hii ' + email + '</p>' + '<h1> Now Your password is' + password + '</h1>';

                con.query('update login set password=? WHERE email=? ', [password, email], (err, result) => {
                    if (err) {
                        console.log(err);
                        return resp.status(400).send({
                            msg: "My error"
                        })
                    }
                    else {
                        sendMail(email, mailsubject, content);
                    }
                })
                // sendMail(email, mailsubject, content);

                // con.query("update customers set token=? WHERE email=?",[randomToken,email],(err,result)=>{
                //     if(err){
                //         console.log(err);
                //         return resp.status(400).send({
                //             msg:err
                //         });  
                //     }
                // });


                // return resp.json({ Status: "success" });
                return resp.status(200).send({
                    msg: "The user has been registered with us"
                });
            }
        });
}

module.exports = {
    forgetpassword
}