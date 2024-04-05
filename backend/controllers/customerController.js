const { validationResult } = require("express-validator");
const con = require('../config/dbConnection');
const bcrypt = require('bcryptjs');

const signupcustomer = (req, resp) => {
  // Extract data from request body
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.pwd; // Assuming this is the password field
  let confirm = req.body.confirm;
  let phone = req.body.phone;
  let address = req.body.address;
  let pincode = req.body.pincode;
  let state = req.body.state;
  let city = req.body.city;
  let role = 'customer';

  const sql1 = `INSERT INTO login (customer_id,email,password,role) VALUES(?,?,?,?)`;
  const sql = `INSERT INTO customers (name,email,password,confirmpassword,phone,address,pincode,city,state,role) VALUES(?,?,?,?,?,?,?,?,?,?)`;

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(400).json({ errors: errors.array() });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return resp.status(500).json({ msg: "Error hashing password" });
    }

    // Remove password from userData object
    const userData = {
        name: name,
        email: email,
        confirm: confirm,
        phone: phone,
        address: address,
        pincode: pincode,
        state: state,
        city: city,
        role: role
    };

    // Store user data with hashed password
    con.query(sql, [name, email, hash, confirm, phone, address, pincode, state, city, role], (err, data) => {
      if (err) {
        console.log(err);
        return resp.status(400).json({ msg: "Error: " + err });
      }

      // Store login information with hashed password
      con.query(sql1, [data.insertId, email, hash, role], (err, result) => {
        if (err) {
          console.log(err);
          return resp.status(400).json({ msg: err });
        }

        // Registration successful
        return resp.status(200).send({
            Status: "Success",
            msg: "The user has been registered with us",
            user: userData
        });
      });
    });
  });
}

module.exports = {
  signupcustomer
};
