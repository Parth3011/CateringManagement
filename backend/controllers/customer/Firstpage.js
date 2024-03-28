const con = require("../../config/dbConnection");

const getcustomermenu = (req, res) => { 
    try {
        con.query("SELECT menus.*, caterers.company FROM menus JOIN caterers ON menus.caterer_id = caterers.caterer_id", (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({ status: 500, message: "Error retrieving menu data" });
            } else {
                console.log("data get");
                res.status(200).json({ status: 200, data: result });
            }
        })
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: 400, message: "Error handling request" });
    }
}

module.exports = {
    getcustomermenu
}