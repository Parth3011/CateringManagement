const con = require("../../config/dbConnection");

const getcatererinfo = (req, res) => {
    const caterer_id = parseInt(req.params.caterer_id);
    console.log(typeof(caterer_id));
    const query = `SELECT * FROM caterers WHERE caterer_id = ?`;
  
    con.query(query, [caterer_id], (err, results) => {
      if (err) {
        console.error('Error fetching caterer details:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Caterer not found' });
        return;
      }
  
      res.json(results[0]); // Return the first caterer matching the id
    });
  };

  const getmenusdetails = (req, res) => {
    const caterer_id = parseInt(req.params.caterer_id);
    const query = `SELECT * FROM menus WHERE caterer_id = ?`;
  
    con.query(query, [caterer_id], (err, results) => {
      if (err) {
        console.error('Error fetching menu details:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      res.json(results); // Return menu details matching the caterer id
    });
  };
  

  module.exports = {
    getcatererinfo,
    getmenusdetails
  }