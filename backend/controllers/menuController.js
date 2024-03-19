const con = require("../config/dbConnection");



const menu = (req, resp) => {

    // let picture = req.file.filename;
    let foodname = req.body.foodname;
    let category = req.body.category;
    let price = req.body.price;
    let description = req.body.description;
    let quantity = req.body.quantity;




    const sql = `INSERT INTO menus (picture,foodname,category,price,description,Quantity) VALUES('images/${req.file.filename}',?,?,?,?,?)`;


    con.query(sql, [, foodname, category, price, description, quantity], (err, data) => {
        if (err) {
            console.log(err);
            return resp.status(400).send({
                msg: err
            });
        }
        else {
            return resp.status(200).send({
                msg: "menu inserted"
            });
        }
    });

};



module.exports = {
    menu
}