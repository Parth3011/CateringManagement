const con = require("../../config/dbConnection");

const orderdetails = (req, res) => {
    console.log("hiii");
    const orderId = req.params.orderId;

    console.log(typeof(orderId));
    console.log(orderId);
    con.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [orderId],
      (err, results) => {
        if (err) {
          console.error("Error fetching order details:", err);
          console.log("Order Problem");
          return res
            .status(500)
            .json({ message: "Error fetching order details." });
        }
        if (results.length === 0) {
            console.log(results.length);
            return res.status(404).json({ message: "Order not found." });
        }
        const order = results[0];
        // Fetch event details
        con.query(
          "SELECT * FROM events WHERE event_id = ?",
          [order.event_id],
          (err, eventResults) => {
            if (err) {
              console.error("Error fetching event details:", err);
              console.log("event Problem");
              return res
                .status(500)
                .json({ message: "Error fetching event details." });
            }
            const event = eventResults[0];
            // Fetch caterer details
            con.query(
              "SELECT * FROM caterers WHERE caterer_id = ?",
              [order.caterer_id],
              (err, catererResults) => {
                if (err) {
                  console.error("Error fetching caterer details:", err);
                  console.log("caterer Problem");
                  return res
                    .status(500)
                    .json({ message: "Error fetching caterer details." });
                }
                const caterer = catererResults[0];
                // Fetch customer details
                con.query(
                  "SELECT * FROM customers WHERE customer_id = ?",
                  [order.customer_id],
                  (err, customerResults) => {
                    if (err) {
                      console.error("Error fetching customer details:", err);
                      console.log("customer Problem");
                      return res
                        .status(500)
                        .json({ message: "Error fetching customer details." });
                    }
                    const customer = customerResults[0];
                    // Combine all details and send response
                    const orderDetails = {
                      order,
                      event,
                      caterer,
                      customer
                    };
                    res.status(200).json(orderDetails);
                  }
                );
              }
            );
          }
        );
      }
    );
  }

  module.exports = {
    orderdetails
};