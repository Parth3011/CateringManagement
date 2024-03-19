
// let con = require("./connection");
const con = require("./config/dbConnection");
const signupadmin= (req, resp) => {

//    await con.connect((err) => {
//         if(err){
//             console.log(err);
//         }
//         console.log("Connected to Mysql");

        let uname = req.body.uname;
        let email = req.body.email;
        let pwd = req.body.pwd;
        let confirm = req.body.confirm;
        let phone = req.body.phone;
        let address = req.body.address;
        let pin = req.body.pin;
        let state = req.body.state;
        let city = req.body.city;

        const sql1 = `INSERT INTO login (id,email,password) VALUES(?,?,?)`;
        const sql = `INSERT INTO admins (name,email,password,confirmpassword,phone,address,pincode,city,state) VALUES(?,?,?,?,?,?,?,?,?)`;

        con.query(sql, [uname, email, pwd, confirm, phone, address, pin, state, city], (err, data) => {
            if (err) {
                console.log(err);
                resp.status.json({ err: "Inserting the data error" });
            // else {
            //     return resp.json({ Status: "success" });
            // }
            }
            else {
                con.query(sql1, [data.insertId, email, pwd], (err, data) => {
                    if (err) {
                        // return resp.json({ Err: "Inserting the data error" });
                        console.log(err);
                    }
                    else {
                        return resp.json({ Status: "success" });
                    }
                });
            }

        });
    // });
};


const signupcaterer = (req, resp) => {

        //  con.connect((err) => {
        // if (err) {
        //     console.log(err);
        // }
        // console.log("Connected to Mysql");

        let uname = req.body.uname;
        let email = req.body.email;
        let company = req.body.company;
        let pwd = req.body.pwd;
        let confirm = req.body.confirm;
        let phone = req.body.phone;
        let address = req.body.address;
        let pin = req.body.pin;
        let state = req.body.state;
        let city = req.body.city;

        const sql1 = `INSERT INTO login (caterer_id,email,password) VALUES(?,?,?)`;
        const sql = `INSERT INTO caterers (name,email,password,confirmpassword,phone,address,pincode,city,state,company) VALUES(?,?,?,?,?,?,?,?,?,?)`;

        con.query(sql, [uname, email, pwd, confirm, phone, address, pin, state, city, company], (err, data) => {
            if (err) {
                console.log(err);
                resp.status.json({ err: "Inserting the data error" });
                // else {
                //     return resp.json({ Status: "success" });
                // }
            }
            else {
                con.query(sql1, [data.insertId, email, pwd], (err, data) => {
                    if (err) {
                        return resp.json({ Err: "Inserting the data error" });
                        // console.log(err);
                    }
                    else {
                        return resp.json({ Status: "success" });
                    }
                });
            }

        });
    // });
};


const signupcustomer =  (req, resp) => {

    // con.connect((err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("Connected to Mysql");

        let uname = req.body.uname;
        let email = req.body.email;
        let pwd = req.body.pwd;
        let confirm = req.body.confirm;
        let phone = req.body.phone;
        let address = req.body.address;
        let pin = req.body.pin;
        let state = req.body.state;
        let city = req.body.city;

        const sql1 = `INSERT INTO login (customer_id,email,password) VALUES(?,?,?)`;
        const sql = `INSERT INTO customers (name,email,password,confirmpassword,phone,address,pincode,city,state) VALUES(?,?,?,?,?,?,?,?,?)`;

        con.query(sql, [uname, email, pwd, confirm, phone, address, pin, state, city], (err, data) => {
            if (err) {
                console.log(err);
                resp.status.json({ err: "Inserting the data error" });
                // else {
                //     return resp.json({ Status: "success" });
                // }
            }
            else {
                con.query(sql1, [data.insertId, email, pwd], (err, data) => {
                    if (err) {
                        // return resp.json({ Err: "Inserting the data error" });
                        console.log(err);
                    }
                    else {
                        return resp.json({ Status: "success" });
                    }
                });
            }

        });
    // });
};


module.exports = { signupadmin, signupcaterer , signupcustomer };
