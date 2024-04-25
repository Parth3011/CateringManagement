const { validationResult } = require("express-validator");

const bcrypt = require('bcrypt');
const con = require("../config/dbConnection");

// const randomstring = require("randomstring");
// const sendMail = require("../helpers/sendmail");

const signupcaterer = (req, resp) => {

    let name = req.body.name;
    let email = req.body.email;
    let pwd = req.body.pwd;
    let confirm = req.body.confirm;
    let phone = req.body.phone;
    let address = req.body.address;
    let pincode = req.body.pincode;
    let state = req.body.state;
    let city = req.body.city;
    let company = req.body.company;
     let role = 'caterer';
   
   


    const sql1 = `INSERT INTO login (caterer_id,email,password,role) VALUES(?,?,?,?)`;
    const sql = `INSERT INTO caterers (name,email,password,confirmpassword,phone,address,pincode,city,state,company,role) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }   

    const userData = {
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd,
        confirm: req.body.confirm,
        phone: req.body.phone,
        address: req.body.address,
        pincode: req.body.pincode,
        state: req.body.state,
        city: req.body.city,
        company:req.body.company,
        role: 'caterer'
    };


    con.query(
       
          `SELECT * FROM caterers WHERE LOWER(email) = LOWER(${con.escape(email)});`&&`SELECT * FROM login WHERE LOWER(email) = LOWER(${con.escape(email)});`,
       
        (err, result) => {
            if (result && result.length) {
                return resp.send({
                    msg: "This user is already in use!"
                });
            }
            // else {
            //     bcrypt.hash(pwd, 10, (err, hash) => {
            //         if (err) {
            //             return resp.status(400).send({
            //                 msg: err
            //             });
            //         }

                    else {

                        // email=con.escape(email);
                        // pwd = con.escape(hash);

                        con.query(sql, [name, email, pwd, confirm, phone, address, pincode, state, city,company,role], (err, data) => {
                            if (err) {
                                console.log(err);
                                return resp.status(400).send({
                                    msg:err
                                });
                                // else {
                                //     return resp.json({ Status: "success" });
                                // }
                            }
                            else {
                                con.query(sql1, [data.insertId, email, pwd,role], (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        return resp.status(400).send({
                                            msg:err
                                        });
                                    }
                                    else {

                                        // let mailsubject = "Mail Verification";
                                        // const randomToken = randomstring.generate();
                                        // let content = '<p>Hii '+uname+', \ Please <a href="http://localhost:7000/mail-verification?token='+randomToken+' ">Verify</a> Your Mail.';

                                        // sendMail(email,mailsubject,content);

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
                                            Status:"Success",
                                            msg:"The user has been registered with us",
                                            user:userData
                                        });
                                    }
                                });
                            }

                        });

                    };
             //   });
            // }
});
}

module.exports = {
    signupcaterer
}