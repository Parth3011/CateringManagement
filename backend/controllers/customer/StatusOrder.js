const con = require("../../config/dbConnection");

const StatusOrder = (req, res) => {
    const orderId = req.params.orderId;
  
    // Query the database to get the order status and rejection description (if available)
    con.query(
      'SELECT orderstatus,rejection_status FROM orders WHERE order_id = ?',
      [orderId],
      (err, result) => {
        if (err) {
          console.error('Error fetching order status:', err);
          return res.status(500).json({ error: 'Error fetching order status' });
        }
  
        if (result.length === 0) {
          return res.status(404).json({ error: 'Order not found' });
        }
  
        const { orderstatus, rejection_status: rejection_status } = result[0];
        res.status(200).json({ orderstatus, rejection_status });
      }
    );
  };
  
  module.exports = {
    StatusOrder
};