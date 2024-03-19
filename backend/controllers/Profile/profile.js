const con = require("../../config/dbConnection");

const updateDetailes = (req, res) => {
    console.log(req.body);
    const email = req.body.email;
    console.log(email);
    const query = `update ${req.body.role}s set name="${req.body.name}",company="${req.body.company||""}",phone="${req.body.phone || ""}",pincode="${req.body.pincode || ""}",city="${req.body.city || ""}",state="${req.body.state || ""}" where email="${email}";`
    con.query(query,  async (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send({
                msg: "My error"
            })
        }
        res.status(200).json({ message: 'Data Updated successfully' });
    });
}
module.exports = {
    updateDetailes
}