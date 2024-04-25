const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const con = require("../config/dbConnection");

// const {JWT_SECRET} = process.env;

const randomstring = require("randomstring");
const sendMail = require("../helpers/sendmail");

const signupcustomer = (req, resp) => {

    // const salt =await bcrypt.genSalt(10);

    let name = req.body.name;
    let email = req.body.email;
    // let pwd = await bcrypt.hash( req.body.pwd,salt) ;
    let pwd = req.body.pwd;
    // const pwd = req.body.pwd;
    let confirm = req.body.confirm;
    let phone = req.body.phone;
    let address = req.body.address;
    let pincode = req.body.pincode;
    let state = req.body.state;
    let city = req.body.city;
    // let user_type = 'customer';
    let role = 'customer';





    const sql1 = `INSERT INTO login (customer_id,email,password,role) VALUES(?,?,?,?)`;
    // const sql1 = `INSERT INTO login (id,email,pwd) VALUES(?,?,?)`;
    const sql = `INSERT INTO customers (name,email,password,confirmpassword,phone,address,pincode,city,state,role) VALUES(?,?,?,?,?,?,?,?,?,?)`;


    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }



    con.query(
        // `SELECT * FROM customers WHERE LOWER(email) = LOWER(${con.escape(
        //     req.body.email
        // )});`,
        `SELECT * FROM customers WHERE LOWER(email) = LOWER(${con.escape(email)});`&&`SELECT * FROM login WHERE LOWER(email) = LOWER(${con.escape(email)});`,

        (err, result) => {
            if (result && result.length) {
                return resp.send({
                    msg: "This user is already in use!"
                });
            }
            // else {
            // bcrypt.hash(pwd,10, (err, hash) => {
            //     if (err) {
            //         return resp.status(400).send({
            //             msg: "Error for Hassing pwd"
            //         });
            //     }

            else {

                // email=con.escape(email);
                // pwd = con.escape(hash);

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
                    role: 'customer'
                };

                con.query(sql, [name, email, pwd, confirm, phone, address, pincode, state, city, role], (err, data) => {
                    if (err) {
                        console.log(err);
                        return resp.status(400).send({
                            msg: "Error"+err
                        });
                        // else {
                        //     return resp.json({ Status: "success" });
                        // }
                    }
                    else {
                        // con.query(sql1, [data.insertId, email, pwd], (err, data) => {
                        con.query(sql1, [data.insertId, email, pwd, role], (err, result) => {
                            if (err) {
                                console.log(err);
                                return resp.status(400).send({
                                    msg: err
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
                            console.log(userData);

                            return resp.status(200).send({
                                Status: "Success",
                                msg: "The user has been registered with us",
                                user:userData
                            });
                        });
                    }

                });

            }
        });
}


// SELECT * FROM customers WHERE LOWER(email) = LOWER(abc);

// const sql1 = `INSERT INTO login (customer_id,email,pwd) VALUES(?,?,?)`;
// const sql = `INSERT INTO customers (name,email,pwd,confirmpwd,phone,address,pincode,city,state) VALUES(?,?,?,?,?,?,?,?,?)`;

//         con.query(sql, [uname, email, pwd, confirm, phone, address, pin, state, city], (err, data) => {
//             if (err) {
//                 console.log(err);
//                 resp.status.json({ err: "Inserting the data error" });
//                 // else {
//                 //     return resp.json({ Status: "success" });
//                 // }
//             }
//             else {
//                 con.query(sql1, [data.insertId, email, pwd], (err, data) => {
//                     if (err) {
//                         // return resp.json({ Err: "Inserting the data error" });
//                         console.log(err);
//                     }
//                     else {
//                         return resp.json({ Status: "success" });
//                     }
//                 });
//             }

//         });
//     // });
// };


// const verifyMail = (req,resp)=>{

//     var token = req.query.token;

//     con.query('SELECT * FROM users WHERE token=? LIMIT 1',token,(err,result)=>{

//         if(err){
//             console.log(err.message);
//         }

//         if(result.length > 0){
//             con.query(`UPDATE users SET token=null, is_verified = 1 WHERE id = '${result[0].id}'
//         `);

//         return resp.render('mail-verification',{message:"Mail Verified Successfully!"});

//         }
//         else{
//             return resp.render('404');
//         }

//     });

//}



// const login = (req, resp) => {
//     console.log(req.body);
//     const { email, pass } = req.body;
//     // let email = req.body.email;
//     // let pwd = req.body.pwd;
//     // let pwd = (req.body.pwd,10);
//     console.log(typeof (pass));

//     const errors = validationResult(req);
//     // console.log(errors)
//     if (!errors.isEmpty()) {
//         return resp.status(400).json({ errors: errors.array() });
//     }


//     // Query to fetch user from login table
//     let query = `SELECT * FROM login WHERE email = ?`;


//     con.query(query, [email], async (err, result) => {
//         //if (err) throw err;


//         if (!result.length) {
//             return resp.status(401).send({
//                 msg: "email or passsord is incorrect"
//             })
//         }
//         else {

//             let query2 = `Select * FROM ${result[0]['role']}s where email = ?`
//             console.log(query2);

//             if (pass === result[0]['password'] && email === result[0]['email']) {
//                 // const token = jwt.sign({id:results[0]['id'],role:results[0]['role']},JWT_SECRET,{expiresIn: '1h'});
//                 con.query(query2, [email], async (err, results) => {

//                     console.log(results[0]);

//                     return resp.status(200).send({
//                         msg: 'loggin',
//                         Status: "Success",
//                         // token,
//                         user: results[0]
//                     });
                    
//                 }
//                 );
//             };
            
//         }
//     });
// };


const login = (req, resp) => {
    console.log(req.body);
    const { email, pass } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

    let query = `SELECT * FROM login WHERE email = ?`;

    con.query(query, [email], async (err, result) => {
        if (err) {
            return resp.status(500).send({
                msg: "Internal server error"
            });
        }

        if (!result.length || pass !== result[0].password) {
            return resp.status(401).send({
                msg: "Email or password is incorrect"
            });
        }

        let query2 = `SELECT * FROM ${result[0].role}s WHERE email = ?`;

        con.query(query2, [email], async (err, results) => {
            if (err) {
                return resp.status(500).send({
                    msg: "Internal server error"
                });
            }

            return resp.status(200).send({
                msg: 'Logged in successfully',
                status: "Success",
                user: results[0]
            });
        });
    });
};



module.exports = {
    signupcustomer,
    // verifyMail,
    login
}