const con = require("../../config/dbConnection");

const Paymentdetails = (req, res) => {
  // const orderId = req.params.orderId;

  // SQL query to fetch payment details based on order ID
  const query = `SELECT * FROM payments`;

  con.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching payment details:', error);
      res.status(500).json({ error: 'Error fetching payment details' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  Paymentdetails
};
