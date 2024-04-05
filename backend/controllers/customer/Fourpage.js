const con = require("../../config/dbConnection");

const order = (req, res) => {
    // Extract event id, caterer id, and customer id from request body and user object
    const { eventId, catererId } = req.body.bookingData;
    const { customer_id } = req.body.user;
    console.log("hii"); 
    // console.log(order_id);

    // Convert catererId to number if it's stored as a string
    const caterer_id = parseInt(catererId);

    // Insert the extracted ids into the orders table
    const query = 'INSERT INTO orders (event_id, customer_id, caterer_id) VALUES (?, ?, ?)';
    const values = [eventId, customer_id, caterer_id];

    con.query(query, values, (err, result) => {
        if (err) {
            console.log("hiiiiii");
            console.error('Error inserting order data: ', err);
            return res.status(500).json({ message: 'Error inserting order data.' });
        }
        const order_id = result.insertId;

        console.log('Order inserted successfully with ID:', order_id);
        res.status(200).json({ message: 'Order placed successfully', order_id });
    });
};

module.exports = {
    order
};
