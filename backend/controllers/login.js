const { validationResult } = require("express-validator");
const con = require('../config/dbConnection');
const bcrypt = require('bcryptjs');

const login = (req, resp) => {
  // Extract email and password from request body
  let email = req.body.email;
  let password = req.body.pwd;

  // SQL query to fetch user data by email
  const sql = `SELECT * FROM customers WHERE email = ?`;

  // Execute the SQL query
  con.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return resp.status(500).json({ msg: 'Internal server error' });
    }

    // Check if user with the provided email exists
    if (result.length === 0) {
      return resp.status(404).json({ msg: 'User not found' });
    }

    // Retrieve hashed password from database
    const hashedPassword = result[0].password;

    // Log the hashed password and password provided during login for debugging
    console.log('Hashed Password:', hashedPassword);
    console.log('Password Provided:', password);

    const trimmedHashedPassword = hashedPassword.trim();
    const trimmedProvidedPassword = password.trim();

    // Compare provided password with hashed password
    bcrypt.compare(trimmedProvidedPassword, trimmedHashedPassword, (err, isMatch) => {
      if (err) {
        console.error('Error:', err);
        return resp.status(500).json({ msg: 'Internal server error' });
      }

      // Log the result of the password comparison
      console.log('Password Comparison Result:', isMatch);

      // Check if passwords match
      if (!isMatch) {
        return resp.status(401).json({ msg: 'Invalid credentials' });
      }

      // Passwords match, login successful
      return resp.status(200).json({ msg: 'Login successful', user: result[0] });
    });
  });
};

module.exports = {
  login
};
