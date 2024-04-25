const con = require("../../config/dbConnection");

const acceptOrder = (req, res) => {
  const orderId = req.params.orderId;

  // Update order status to "accepted" in the database
  con.query(
    "UPDATE orders SET orderstatus = 'accepted' WHERE order_id = ?",
    [orderId],
    (err) => {
      if (err) {
        console.error("Error accepting order:", err);
        return res.status(500).json({ message: "Error accepting order." });
      }
      res.status(200).json({ message: "Order accepted successfully." });
    }
  );
};

const rejectOrder = (req, res) => {
    const orderId = req.params.orderId;
    const description = req.body.description;
    con.query(
      "UPDATE orders SET orderstatus = 'rejected', rejection_status = ? WHERE order_id = ?",
      [description, orderId], 
      (err) => {
        if (err) {
          console.error("Error rejecting order:", err);
          return res.status(500).json({ message: "Error rejecting order." });
        }
        res.status(200).json({ message: "Order rejected successfully." });
      }
    );
  };
  

module.exports = {
  acceptOrder,
  rejectOrder
};
