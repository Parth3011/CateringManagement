const con = require("../../config/dbConnection");

const Orderhistory = (req, res) => {
  const customerId = req.params.customerId;

  const query = `
    SELECT orders.*, events.*, caterers.*
    FROM orders
    LEFT JOIN events ON orders.event_id = events.event_id
    LEFT JOIN caterers ON orders.caterer_id = caterers.caterer_id
    WHERE orders.customer_id = ?    
  `;

  con.query(query, [customerId], (error, results) => {
    if (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Error fetching order details' });
    } else {
      res.status(200).json(results);
    }
  });
};

module.exports = {
  Orderhistory
};
