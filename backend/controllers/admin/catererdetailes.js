
const con = require("../../config/dbConnection");

const getCatererDetail = (req, res) => {
  const query = 'SELECT * FROM caterers';
  // console.log(query);
  con.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
}

const deletecaterer = (req, res) => {
  const id = parseInt(req.params.id);

  const sql = 'DELETE FROM caterers WHERE caterer_id = ?';
  const sql1 = 'DELETE FROM login WHERE caterer_id = ?';
  console.log(id);
  console.log(typeof (id));

  con.query(sql1, id, (err, result) => {
    if (err) {
      console.error('Error deleting data: ', err);
      res.status(500).json({ error: 'Error deleting data' });
    } else {
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
  });
}


  module.exports = {
    getCatererDetail,
    deletecaterer
  }