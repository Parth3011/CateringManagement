const con = require("../../config/dbConnection");

const event = (req, res) => {
    const events = req.body;
    const { items, totalPrice, numberOfPeople, event: eventName, time, date, address, city, state } = events;

    // Validate booking data
    if (!events || !items || !totalPrice || !numberOfPeople || !eventName || !time || !date || !address || !city || !state) {
        return res.status(400).json({ message: 'Booking data is incomplete.' });
    }

    // Insert each item into the events table
    items.forEach(item => {
        const { foodname } = item;
        const query = `
            INSERT INTO events (eventname, no_of_people, TotalPrice, menuname, date, time, address, city, state)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [eventName, numberOfPeople, totalPrice, foodname, date, time, address, city, state];

        con.query(query, values, (err, result) => {
            if (err) {
                console.error('Error inserting booking data: ', err);
                return res.status(500).json({ message: 'Error inserting booking data.' });
            }
            console.log('Booking inserted successfully');
        });
    });

    // Respond with success message
    res.status(200).json({ message: 'Booking successful' });
};

module.exports = {
    event
};
