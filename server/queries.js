const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:X7C6kBoE1skIa8Ent3Mc3akyuIDNj0bn@dpg-ciqkg8lgkuvrtoe6fel0-a.oregon-postgres.render.com/registration_mfyh?ssl=true';
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const pool = new Pool({
    connectionString,
});
const { SECRET } = process.env;

pool.connect();

const login = (req, res) => {
    const userName = [req.body.username];
    const queryStr = 'select * from users where username = $1'

    pool.query(queryStr, userName, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'A server error occurred while logging in.' });
        } else {
            console.log(dbRes.rows[0]);
            if (dbRes.rows.length) {
                let validUser = bcrypt.compareSync(req.body.password, dbRes.rows[0].hash)
                if (validUser) {
                    console.log('user verified')
                    let { username, email, isadmin, firstname, lastname, telephone, address, userid } = dbRes.rows[0];
                    let token = jwt.sign({
                        username, email, isadmin, firstname, lastname, telephone, address, userid
                    }, SECRET, {
                        algorithm: 'HS256',
                        expiresIn: '30d'
                    })
                    res.status(200).json({
                        isadmin: isadmin,
                        token: token
                    })
                } else {
                    res.status(404).send('incorrect username or password');
                }
            } else {
                res.status(404).send('incorrect username or password');
            }
        }
    });
}

const addUser = (req, res) => {
    const text = 'insert into users(username, email, hash, isadmin, firstname, lastname, telephone, address, createdate, userid';

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
            res.status(200).json(dbRes.rows[0]);
        }
    });
}

const getUser = (req, res) => {
    const text = 'select username, firstname, lastname, email, telephone, address, userid from users where userid = $1';
    const id = req.auth.userid;

    pool.query(text, [id], (err, results) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
        } else {
            res.status(200).json(results.rows)
        }
    });
};

const getUserList = (req, res) => {
    pool.query('select * from users', (err, results) => {
        if (err) {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

const updateUser = (req, res) => {
    const text = 'update users set username = $1, email = $2, firstname = $3, lastname = $4, telephone = $5, address = $6 where userid = $7 returning *'
    const values = [
        req.body.username, req.body.email, req.body.fname, req.body.lname, req.body.phone, req.body.address, req.auth.userid
    ]

    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while updating the user.' });
        } else {
            console.log(dbRes.rows[0]);
            res.status(200).json(dbRes.rows[0]);
        }
    });
}

const deleteUser = (req, res) => {
    const text = 'delete from users where userid = $1';
    const value = [req.body.userid]

    pool.query(text, value, (err, dbRes) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred while deleting the user.' });
        } else
        res.status(200).json(dbRes.rows[0]);
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

const displayCourses = (req, res) => {
    pool.query('select * from course', (err, results) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
        } else {
            res.status(200).json(results.rows)
        }
    })
}

const registerUserForCourse = (req, res) => {
    const text = 'insert into users_courses(user_id, course_id) values ($1, $2) returning *'

    const values = [
        req.body.userid, req.body.courseid
    ]
    console.log(`values: ${values}`);
    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
        } else {
            console.log(dbRes.rows[0]);
            res.status(200).json(dbRes.rows[0]);
        }
    });
}

const getUserCourses = (req, res) => {
    console.log(`getUserCourses for ${req.auth.userid}`);
    const text = `select course_id from users_courses where user_id = '${req.auth.userid}'`;
    pool.query(text, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: `An error occurred while getting the user's course list.` });
        } else {
            console.log(dbRes.rows);
            res.status(200).json(dbRes.rows);
        }
    });

}

module.exports = {
    login,
    addUser,
    getUser,
    getCourse,
    displayCourses,
    updateUser,
    registerUserForCourse,
    getUserCourses
}
