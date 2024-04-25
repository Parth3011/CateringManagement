const con = require("../../config/dbConnection");

const orderrequest = (req, res) => {
    const caterer_id = req.query.caterer_id;

    con.query(
      "SELECT * FROM orders WHERE caterer_id = ?",
      [caterer_id],
      (err, orderResults) => {
        if (err) {
            console.log("hiiiii")
          console.error("Error fetching orders:", err);
          return res.status(500).json({ message: "Error fetching orders." });
        }
        if (orderResults.length === 0) {
            console.log("hiiii");
          return res.status(404).json({ message: "No orders found." });
        }

        const orders = orderResults;
        console.log(orders);

        // Fetch details for each order
        const promises = orders.map(order => {
          return new Promise((resolve, reject) => {
            // Fetch event details
            con.query(
              "SELECT * FROM events WHERE event_id = ?",
              [order.event_id],
              (err, eventResults) => {
                if (err) {
                  console.error("Error fetching event details:", err);
                  reject("Error fetching event details.");
                }
                const event = eventResults[0];

                // Fetch caterer details
                con.query(
                  "SELECT * FROM caterers WHERE caterer_id = ?",
                  [order.caterer_id],
                  (err, catererResults) => {
                    if (err) {
                      console.error("Error fetching caterer details:", err);
                      reject("Error fetching caterer details.");
                    }
                    const caterer = catererResults[0];

                    // Fetch customer details
                    con.query(
                      "SELECT * FROM customers WHERE customer_id = ?",
                      [order.customer_id],
                      (err, customerResults) => {
                        if (err) {
                          console.error("Error fetching customer details:", err);
                          reject("Error fetching customer details.");
                        }
                        const customer = customerResults[0];

                        // Combine all details
                        const orderDetail = {
                          order,
                          event,
                          caterer,
                          customer
                        };
                        resolve(orderDetail);
                      }
                    );
                  }
                );
              }
            );
          });
        });

        Promise.all(promises)
          .then(orderDetails => {
            res.status(200).json(orderDetails);
          })
          .catch(error => {
            console.error("Error:", error);
            res.status(500).json({ message: "Error fetching order details." });
          });
      }
    );
};

module.exports = {
    orderrequest
};
