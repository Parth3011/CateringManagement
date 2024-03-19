
const con = require("../../config/dbConnection");

const getCustomerDetail = (req, res) => {
    const query = 'SELECT * FROM customers';
    // console.log(query);
  con.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
}

module.exports = {
    getCustomerDetail
}