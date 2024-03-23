const con = require("../config/dbConnection");


const menu = (req, res) => {

    console.log(req.body);
    console.log(req.file);

    const { foodname, category, price, desc, status } = req.body;
    const { filename } = req.file;

    if (!foodname || !filename || !category || !price || !desc || !status) {
        // console.log(foodname,filename,category,price,desc,status);
        res.status(422).json({ status: 422, message: "Fill all the details" });
    }

    try {
        con.query("INSERT INTO menus SET ?", { picture: filename, foodname: foodname, category: category, price: price, description: desc, status: status }, (err, result) => {
            if (err) {
                console.log("error");
            } else {
                console.log("data added");
                res.status(200).json({ status: 200, data: req.body })
            }
        })
    }
    catch (err) {
        res.status(400).json({ status: 400, message: "This is my error" })
    }
};



const getmenu = (req, res) => {
    try {
        con.query("SELECT * FROM menus", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log("data get");
                res.status(200).json({ status: 200, data: result });
            }
        })
    }
    catch (err) {
        res.status(400).json({ status: 400, message: "This is my error" })
    }
}



const deletemenu = (req, res) => {
    const id = parseInt(req.params.id);
  
    const sql = 'DELETE FROM menus WHERE id = ?';
    console.log(id);
    console.log(typeof (id));
 
        // console.log('Data deleted successfully');
        con.query(sql, id, (err, result) => {
          if (err) {
            console.error('Error deleting data: ', err);
            res.status(500).json({ error: 'Error deleting data' });
          } else {
            console.log('Data deleted successfully');
            res.status(200).json({ message: 'Data deleted successfully' });
            // res.redirect('/catererdetailes');
          }
        });
      }
   



      
const updatemenu = (req, res) => {
    const id = parseInt(req.params.id);

    const { foodname, category, price, desc, status } = req.body;
    const { filename } = req.file;  
  
    const sql = `UPDATE FROM menus SET foodname="${foodname}",picture="${filename}",foodname="${foodname}",picture="${filename}" WHERE id = "${id}";`
    console.log(id);
    console.log(typeof (id));
 
        // console.log('Data deleted successfully');
        con.query(sql, (err, result) => {
          if (err) {
            console.error('Error Updating data: ', err);
            res.status(500).json({ error: 'Updating data' });
          } else {
            console.log('Data Updaing successfully');
            res.status(200).json({ message: 'Data Updating successfully' });
            // res.redirect('/catererdetailes');
          }
        });
      }


      const getmenu1 = (req, res) => {
        const id =  parseInt(req.params.id);
        try {
            con.query(`SELECT * FROM menus WHERE id=?`,id ,(err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("data get");
                    res.status(200).json({ status: 200, data: result[0] });
                }
            })
        }
        catch (err) {
            res.status(400).json({ status: 400, message: "This is my error" })
        }
    }


module.exports = {
    menu,
    getmenu,
    deletemenu,
    updatemenu,
    getmenu1
}







// if (!req.file) {
//     return res.status(400).send('No file uploaded.');
// }
// const { name, price, category, desc, status } = req.body;
// const { filename, path: filepath, mimetype, size } = req.file;

// const sql = 'INSERT INTO menus (name, price, category, description, status, filename, filepath, mimetype, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
// db.query(sql, [name, price, category, desc, status, filename, filepath, mimetype, size], (err, result) => {
//     if (err) {
//         console.error('Error inserting file info into database:', err);
//         return res.status(500).send('Error uploading file.');
//     }
//     res.status(200).send('File uploaded successfully.');
// });