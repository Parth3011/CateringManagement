// const bcrypt = require('bcryptjs');

const { validationResult } = require("express-validator");
const express = require("express");
const con = require("../config/dbConnection");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');



const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const signupcustomer = (req, resp) => {
    const { uname, email, pwd, confirm, phone, address, pin, state, city } = req.body;

    const role = 'customer';

    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

    con.query(
        `SELECT * FROM customers WHERE LOWER(email) = LOWER(${con.escape(email)});`,
        (err, result) => {
            if (result && result.length) {
                return resp.status(409).send({
                    msg: "This user is already in use!"
                });
            }
            else {
                bcrypt.genSalt(10,(err,salt)=>{
                    //     bcrypt.hash(pwd,salt, (err, hash) 
                bcrypt.hash(pwd, salt, (err, hash) => {
                    if (err) {
                        resp.status(500).json({ error: 'Hassing error' });
                    } else {
                        const register = {
                            name: uname,
                            email: email,
                            password: hash,
                            confirmpassword: confirm,
                            phone: phone,
                            address: address,
                            pincode: pin,
                            state: state,
                            city: city,
                            role: role
                        };



                        con.query('INSERT INTO customers SET ?', register, (err, result) => {
                            if (err) {
                                console.log(err);
                                resp.status(500).json({ error: 'why Failed to register user' });
                            }
                            else {
                                const login = {
                                    customer_id: result.insertId,
                                    email: email,
                                    password: hash,
                                    role: role
                                }
                                con.query('INSERT INTO login SET ?', login, (err, result) => {
                                    if (err) {
                                        resp.status(500).json({ error: 'Failed to register user' });
                                    }
                                    else {
                                        resp.status(200).json({ message: 'User registered successfully' });
                                    }
                                });
                            }
                        });
                    }
                });
                });
            }
        });
}



module.exports = {
    signupcustomer
}