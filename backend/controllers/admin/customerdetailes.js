
const con = require("../../config/dbConnection");

const getCustomerDetail = (req, res) => {
    const query = 'SELECT * FROM customers';
    // console.log(query);
  con.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
}

const deletecustomer = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = 'DELETE FROM customers WHERE customer_id = ?';
  const sql1 = 'DELETE FROM login WHERE customer_id = ?';
  console.log(id);
  console.log(typeof (id));

  con.query(sql1, id, (err, result) => {
    if (err) {
      console.error('Error deleting data: ', err);
      res.status(500).json({ error: 'Error deleting data' });
    } else {
      // console.log('Data deleted successfully');
      con.query(sql, id, (err, result) => {
        if (err) {
          console.error('Error deleting data: ', err);
          res.status(500).json({ error: 'Error deleting data' });
        } else {
          console.log('Data deleted successfully');
          res.status(200).json({ message: 'Data deleted successfully' });
          // res.redirect('/catererdetailes');
        }
      });
    }
  });
}


  module.exports = {
    getCustomerDetail,
    deletecustomer
  }