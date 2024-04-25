const con = require("../../config/dbConnection");

const getPaymentStatus = (req, res) => {
  const orderId = req.params.orderId;

  console.log("hiiii");

  // Query the database to get the payment status based on the order ID
  con.query(
    "SELECT payment_status FROM payments WHERE order_id = ?",
    [orderId],
    (err, result) => {
      if (err) {
        console.error("Error fetching payment status:", err);
        return res.status(500).json({ message: "Error fetching payment status." });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Payment status not found for the order." });
      }
      const paymentStatus = result[0].payment_status;
      res.status(200).json({ status: paymentStatus });
    }
  );
};

module.exports = {
  getPaymentStatus
};
