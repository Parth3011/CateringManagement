const { validationResult } = require("express-validator");

const bcrypt = require('bcrypt');
const con = require("../config/dbConnection");

// const randomstring = require("randomstring");
// const sendMail = require("../helpers/sendmail");

const signupadmin = (req, resp) => {

    let name = req.body.name;
    let email = req.body.email;
    const pwd = req.body.pwd;
    let confirm = req.body.confirm;
    let phone = req.body.phone;
    let address = req.body.address;
    let pincode = req.body.pincode;
    let state = req.body.state;
    let city = req.body.city;
    let role = 'admin';


   


    const sql1 = `INSERT INTO login (admin_id,email,password,role) VALUES(?,?,?,?)`;
    const sql = `INSERT INTO admins (name,email,password,confirmpassword,phone,address,pincode,city,state,role) VALUES(?,?,?,?,?,?,?,?,?,?)`;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return resp.status(400).json({ errors: errors.array() });
    }

    console.log(pwd);

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
        role: 'admin'
    };


    con.query(
        
          `SELECT * FROM admins WHERE LOWER(email) = LOWER(${con.escape(email)});`,
       
        (err, result) => {
            if (result && result.length) {
                return resp.status(409).send({
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


                        con.query(sql, [name, email, pwd, confirm, phone, address, pincode, state, city,role], (err, data) => {
                            if (err) {
                                console.log(err);
                                return resp.status(400).send({
                                    msg:"hi"+err
                                });

                            }
                            else {
                                con.query(sql1, [data.insertId,email, pwd, role], (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        return resp.status(400).send({
                                            msg:err
                                        });
                                    }
                                    // else {


                                    //     let mailsubject = "Mail Verification";
                                    //     const randomToken = randomstring.generate();
                                    //     let content = '<p>Hii '+uname+', \ Please <a href="http://localhost:7000/mail-verification?token='+randomToken+' ">Verify</a> Your Mail.';

                                    //     sendMail(email,mailsubject,content);

                                    //     con.query("update customers set token=? WHERE email=?",[randomToken,email],(err,result)=>{
                                    //         if(err){
                                    //             console.log(err);
                                    //             return resp.status(400).send({
                                    //                 msg:err
                                    //             });  
                                    //         }
                                    //     });


                                        // return resp.json({ Status: "success" });
                                        return resp.status(200).send({
                                            msg:"The user has been registered with us",
                                            Status:"Success",
                                            user:userData
                                        });
                                    // }
                                });
                            }
    
                        });
                        // });
                    };
            //     });
            //  }
});
}
    

module.exports = {
    signupadmin
}