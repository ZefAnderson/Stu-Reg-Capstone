const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});


module.exports = {
    addUser: (req, res) => {
    const text = 'insert into users(username, email, hash, isadmin, firstname, lastname, telephone, address, createdate) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
    const values = [
        req.body.username, req.body.email, req.body.hash, req.body.isadmin, req.body.firstname, req.body.lastname, req.body.telephone, req.body.address, Date.now()
    ]
    pool.query(text, values, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    });
    },

    updateUser: (req, res) => {
    let username  = req.body.username;
    let firstname = req.body.firstName;
    pool.query('update user set first_name = $1 where username = $2 returning *', 
    [firstname, username], 
    (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
    },

    getCourse: (req, res) => {
    console.log(`db getCourse`);
    pool.query('select courseid', (err, results) => {
        if (err) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
    }
}