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
            res.status(200).json(dbRes.rows[0]);
        }
    });
}

const addCourse = (req, res) => {
    const text = 'insert into course(courseid, title, description, schedule, classroom_number, maximum_capacity, credit_hours, tuition_cost) values ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [
        req.body.courseid, req.body.title, req.body.description, req.body.schedule, req.body.classroom, req.body.capacity, req.body.creditHours, req.body.tuition
    ]

    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the course.' });
        } else {
            console.log(dbRes.rows);
            res.status(200).json(dbRes.rows);
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

const updateCourse = (req, res) => {
    const text = 'update course set courseid = $1, title = $2, description = $3, schedule = $4, classroom_number = $5, maximum_capacity = $6, credit_hours = $7, tuition_cost = $8 where courseid = $9'
    const values = [
        req.body.courseid, req.body.title, req.body.description, req.body.schedule, req.body.classroom, req.body.capacity, req.body.creditHours, req.body.tuition, req.body.currid
    ]

    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while updating the course.' });
        } else {
            console.log(dbRes.rows);
            res.status(200).json(dbRes.rows);
        }
    });
}

const updatePerAdmin = (req, res) => {
    const text = 'update users set username = $1, firstname = $2, lastname = $3, email = $4, isadmin = $5, telephone = $6, address = $7 where userid = $8 returning *';
    const values = [
        req.body.username, req.body.fname, req.body.lname, req.body.email, req.body.isadmin, req.body.phone, req.body.address, req.body.userid
    ]

    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while updating the user.' });
        } else {
            console.log(dbRes.rows[0]);
            res.status(200).json(dbRes.rows[0]);
        }
    })
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

const deleteCourse = (req, res) => {
    const text = 'delete from course where courseid = $1';
    const value = [req.body.courseid];

    pool.query(text, value, (err, dbRes) => {
        if (err) {
            res.status(500).json({ error: 'An error occurred while deleting the course.' });
        } else
        res.status(200).json(dbRes.rows);
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

const getStudentsInCourse = (req, res) => {
    const text = 'SELECT firstname, lastname FROM users WHERE users.userid IN (SELECT user_id FROM users_courses WHERE course_id = $1)';
    const values = [req.query.courseid];

    pool.query(text, values, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while getting users.' });
        } else {
            console.log(dbRes.rows);
            res.status(200).json(dbRes.rows);
        }
    });
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
    const text =
        'SELECT ' +
            'courseid, ' +
            'title, ' +
            'description, ' +
            'schedule, ' +
            'classroom_number, ' +
            'maximum_capacity, ' +
            'credit_hours, ' +
            'tuition_cost ' +
        'FROM course ' +
        'WHERE course.courseid in (SELECT course_id ' +
            'FROM users_courses ' +
            `WHERE user_id = '${req.auth.userid}');`

    pool.query(text, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: `An error occurred while getting the user's course list.` });
        } else {
            res.status(200).json(dbRes.rows);
        }
    });
}

const getAdminCourses = (req, res) => {
    pool.query('select * from users_courses', (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred' });
        } else {
            console.log(dbRes.rows);
            res.status(200).json(dbRes.rows);
        }
    })
}

const dropUserCourse = (req, res) => {
    // console.log(`dropping course ${req.body.course_id} for user ${req.auth.userid} `);
    const text = `delete from users_courses where user_id = '${req.auth.userid}' and course_id = '${req.body.course_id}'`;
    pool.query(text, (err, dbRes) => {
        if (err) {
            console.error(err.stack);
            res.status(500).json({ error: `An error occurred while dropping a course.` });
        } else {
            // console.log(dbRes.rows);
            getUserCourses(req, res);
//            res.status(200).json(dbRes.rows);
        }
    });
}

module.exports = {
    login,
    addUser,
    addCourse,
    getUser,
    getCourse,
    displayCourses,
    updateUser,
    updateCourse,
    updatePerAdmin,
    deleteUser,
    deleteCourse,
    getStudentsInCourse,
    registerUserForCourse,
    getUserCourses,
    getAdminCourses,
    dropUserCourse,
    getUserList
}
