const con = require("../../config/dbConnection");

const event = (req, res) => {
    const events = req.body;
    console.log(events);
    const { items, totalPrice, numberOfPeople, event: eventName, time, date, address, city, state } = events;


    // Validate booking data
    if (!events || !items || !totalPrice || !numberOfPeople || !eventName || !time || !date || !address || !city || !state) {
        console.log("here")
        return res.status(400).json({ message: 'Booking data is incomplete.' });
    }

    // Extract food names from items and join them with commas

    console.log(typeof(items));

    // if (!items || !Array.isArray(items) || !totalPrice || !numberOfPeople || !eventName || !time || !date || !address || !city || !state) {
    //     return res.status(400).json({ message: 'Booking data is incomplete or invalid.' });
    // }

    // console.log("hello")
    // const foodNames = items.map(item => item.foodname).join(', ');
    // console.log("here");
    // Insert combined food names into the events table
    const query = `
        INSERT INTO events (eventname, no_of_people, TotalPrice, menuname, date, time, address, city, state)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [eventName, numberOfPeople, totalPrice, items, date, time, address, city, state];

    con.query(query, values, (err, result) => {
        if (err) {
            console.log("hiiiiii");
            console.error('Error inserting booking data: ', err);
            return res.status(500).json({ message: 'Error inserting booking data.' });
        }
        const eventId = result.insertId; // Get the auto-generated event ID
        console.log('Booking inserted successfully');
        res.status(200).json({ message: 'Booking successful', eventId }); 
    });
};

module.exports = {
    event
};
