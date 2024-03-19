const { validationResult } = require("express-validator");
let express = require("express");
const con = require("../config/dbConnection");
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');



const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






const login = (req, resp) => {
    let { email,pwd } = req.body;
    // const password = bcrypt.hashSync(pwd, 10);
    // pwd = `${con.escape(req.body.pwd)}`;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

  
    con.query('SELECT * FROM login WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        resp.status(500).json({ error: 'Internal server error' });
        return;
      }
  

      if (results.length === 0) {
        resp.status(404).json({ error: 'User not found' });
        return;
      }
  
      const user = results[0];

    //   pwd = pwd.toString();
    //   console.log(pwd);

      bcrypt.compare(pwd, user['password'], (err, isMatch) => {
        if (err) {
          console.error('Error comparing passwords:', err);
          resp.status(500).json({ error: 'email or password are incorrect' });
          return;
        }

        console.log('Provided Password:', pwd);
        console.log('Stored Hashed Password:', user['password']);

        if (isMatch) {
          // You can perform additional actions here, such as generating a JWT token for authentication
          resp.status(200).json({ message: 'Login successful' });
        } else {
            // console.log(email);
            // console.log(pwd);
            console.log(isMatch);
            // console.log(user.password);
          resp.status(401).json({ error: 'Error or password are incorrect' });
        }
      });
    });
  };




module.exports = {
    login
}