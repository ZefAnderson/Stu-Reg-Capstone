const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
});


pool.connect();

const addUser = (req, res) => {
    console.log(pool);
    console.log("dburl ", process.env.DATABASE_URL);
    const text = 'insert into users(username, email, hash, isadmin, firstname, lastname, telephone, address, createdate) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';

    const values = [
        req.body.username, req.body.email, req.body.password, false, req.body.fname, req.body.lname, req.body.phone, req.body.address, new Date()
    ]
    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
        } else {
            console.log(dbRes.rows[0]);
            res.status(201).json(dbRes.rows[0]);
        }
    });
}

const updateUser = (req, res) => {
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
}

const getCourse = (req, res) => {
    console.log(`db getCourse`);
    pool.query('select courseid from course', (err, results) => {
        if (err) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {addUser, getCourse, updateUser}