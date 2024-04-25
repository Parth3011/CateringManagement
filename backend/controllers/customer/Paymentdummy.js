const Razorpay = require('razorpay');
const con = require("../../config/dbConnection");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Route to create a payment order
const payment = (req, res) => {
    const { amount, orderId, menuname } = req.body; // Amount to charge (in paisa)

    const options = {
        amount,
        currency: 'INR',
        receipt: 'order_rcptid_11',
        payment_capture: 0, // 1 to capture payment automatically
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            console.error('Error creating Razorpay order:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }

        console.log('Razorpay order created:', order);

        res.status(200).send({
            success: true,
            msg: "Order Created",
            order_id: order.id, // Use order.id instead of orderId
            amount,
            key_id: process.env.RAZORPAY_ID_KEY,
            menuname,
        });
    });
};

// Route to handle payment success callback from Razorpay
const paymentsuccess = (req, res) => {
    console.log("success");
    const { order_id, payment_id ,price} = req.body;
    const payment_status = "done";
    // Save payment details to MySQL database
    const payment = {
        order_id,
        payment_id,
        price,
        payment_status,
        // Add other payment details as needed
    };

    const sql = 'INSERT INTO payments SET ?';
    con.query(sql, payment, (err, result) => {
        if (err) {
            console.error('Error saving payment details to database:', err);
            return res.status(500).json({ error: 'Something went wrong' });
        }

        console.log('Payment details saved to database:', result);

        res.json({ message: 'Payment successful' });
    });
};

module.exports = {
    payment,
    paymentsuccess
};
