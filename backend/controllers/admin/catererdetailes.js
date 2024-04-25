
const con = require("../../config/dbConnection");

const getCatererDetail = (req, res) => {
  const query = `
    SELECT 
      caterers.*, 
      GROUP_CONCAT(orders.order_id) AS order_ids
    FROM 
      caterers
    LEFT JOIN 
      orders ON caterers.caterer_id = orders.caterer_id
    GROUP BY 
      caterers.caterer_id
  `;

  con.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching caterer details:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
};





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