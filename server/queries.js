const bcrypt = require('bcrypt')
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:X7C6kBoE1skIa8Ent3Mc3akyuIDNj0bn@dpg-ciqkg8lgkuvrtoe6fel0-a.oregon-postgres.render.com/registration_mfyh?ssl=true';
console.log(`connectionString: ${connectionString}`);
const { v4: uuidv4 } = require('uuid');
const pool = new Pool({
    connectionString,
});


pool.connect();

const login = (req, res) => {
    const queryStr = `select * from users where username = '${req.body.username}'`

    pool.query(queryStr, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'A server error occurred while logging in.' });
        } else {
            console.log(dbRes.rows[0]);
            if (dbRes.rows[0].hash === req.body.password) {
                //res.status(201).json(dbRes.rows[0]);
                res.status(201).json({
                    username: dbRes.rows[0].username,
                    isadmin: dbRes.rows[0].isadmin
                });
            }
        }
    });
}

const addUser = (req, res) => {
    const text = 'insert into users(username, email, hash, isadmin, firstname, lastname, telephone, address, createdate, userid) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const values = [
        req.body.username, req.body.email, hashedPassword, false, req.body.fname, req.body.lname, req.body.phone, req.body.address, new Date(), uuidv4()
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

const getUser = (req, res) => {
    const text = `select * from users where username = '$1'`;
    const value = req.body.username;

    pool.query(text, value, (err, results) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
        } else {
            res.status(200).json(results.rows)
        }
    });
};

const updateUser = (req, res) => {
    const text = 'update users set username = $1, email = $2, firstname = $3, lastname = $4, telephone = $5, address = $6 where userid = $7 returning *'
    const values = [
        req.body.username, req.body.email, req.body.fname, req.body.lname, req.body.phone, req.body.address, req.body.userid
    ]

    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while updating the user.' });
        } else {
            console.log(dbRes.rows[0]);
            res.status(201).json(dbRes.rows[0]);
        }
    });
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

const displayCourses = (req, res) => {
    console.log('display courses');
    pool.query('select * from course', (err, results) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
        } else {
            res.status(200).json(results.rows)
        }
    })
}

module.exports = { login, addUser, getUser, getCourse, displayCourses, updateUser }
