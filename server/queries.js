const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const connectionString = process.env.DATABASE_URL || 'postgres://dbuser:X7C6kBoE1skIa8Ent3Mc3akyuIDNj0bn@dpg-ciqkg8lgkuvrtoe6fel0-a.oregon-postgres.render.com/registration_mfyh?ssl=true';
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const pool = new Pool({
    connectionString,
});

const secretKey = process.env.SECRET_KEY;

// pool.connect();

const login = async (req, res) => {
    try {
        const userName = [req.body.username];
        const queryStr = 'select * from users where username = $1';

        const dbRes = await pool.query(queryStr, userName);

        if (dbRes.rows.length) {
            const validUser = bcrypt.compareSync(req.body.password, dbRes.rows[0].hash);

            if (validUser) {
                console.log('user verified');
                const { username,
                        email,
                        isadmin,
                        firstname,
                        lastname,
                        telephone,
                        address,
                        userid
                    } = dbRes.rows[0];

                const token = jwt.sign(
                    {
                        username,
                        email,
                        isadmin,
                        firstname,
                        lastname,
                        telephone,
                        address,
                        userid
                    },
                    secretKey,
                    {
                        algorithm: 'HS256',
                        expiresIn: '30d'
                    }
                );

                res.status(200).json({
                    isadmin: isadmin,
                    token: token
                });
            } else {
                res.status(404).send('incorrect username or password');
            }
        } else {
            res.status(404).send('incorrect username or password');
        }
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'A server error occurred while logging in.' });
    }
};

const addUser = async (req, res) => {
    const text = 'insert into users(username, email, hash, isadmin, firstname, lastname, telephone, address, createdate, userid) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *';

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const values = [
        req.body.username,
        req.body.email,
        hashedPassword,
        false,
        req.body.fname,
        req.body.lname,
        req.body.phone,
        req.body.address,
        new Date(), uuidv4()
    ]

    try {
        const dbRes = await pool.query(text, values);
        console.log(dbRes.rows[0]);
        res.status(200).json(dbRes.rows[0]);
    } catch (error) {
            console.error(err.stack);
            res.status(500).json({ error: 'An error occurred while adding the user.' });
        }
}

const addCourse = async (req, res) => {
    try {
        const text = 'insert into course(courseid, title, description, schedule, classroom_number, maximum_capacity, credit_hours, tuition_cost) values ($1, $2, $3, $4, $5, $6, $7, $8)';
        const values = [
            req.body.courseid,
            req.body.title,
            req.body.description,
            req.body.schedule,
            req.body.classroom,
            req.body.capacity,
            req.body.creditHours,
            req.body.tuition
        ];

        const dbRes = await pool.query(text, values);

        console.log(dbRes.rows);
        res.status(200).json(dbRes.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while adding the course.' });
    }
};

const getUser = async (req, res) => {
    try {
        const text = 'select username, firstname, lastname, email, telephone, address, userid from users where userid = $1';
        const id = [req.auth.userid];

        const results = await pool.query(text, id);

        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while getting the user.' });
    }
};

const getUserId = async (req, res) => {
    try {
        const text = 'select userid from users where firstname = $1 and lastname = $2';
        const values = [req.query.firstname, req.query.lastname];
        console.log(values);

        const results = await pool.query(text, values);

        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while getting the userid.' });
    }
};

const getUserList = async (req, res) => {
    try {
        const results = await pool.query('select * from users');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while getting the user list.' });
    }
};

const updateUser = async (req, res) => {
    try {
        const text = 'update users set username = $1, email = $2, firstname = $3, lastname = $4, telephone = $5, address = $6 where userid = $7 returning *';
        const values = [
            req.body.username,
            req.body.email,
            req.body.fname,
            req.body.lname,
            req.body.phone,
            req.body.address,
            req.auth.userid
        ];

        const dbRes = await pool.query(text, values);

        console.log(dbRes.rows[0]);
        res.status(200).json(dbRes.rows[0]);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};

const updateCourse = async (req, res) => {
    try {
        const text = 'update course set courseid = $1, title = $2, description = $3, schedule = $4, classroom_number = $5, maximum_capacity = $6, credit_hours = $7, tuition_cost = $8 where courseid = $9';
        const values = [
            req.body.courseid,
            req.body.title,
            req.body.description,
            req.body.schedule,
            req.body.classroom,
            req.body.capacity,
            req.body.creditHours,
            req.body.tuition,
            req.body.currid
        ];

        const dbRes = await pool.query(text, values);

        console.log(dbRes.rows);
        res.status(200).json(dbRes.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while updating the course.' });
    }
};

const updatePerAdmin = async (req, res) => {
    try {
        const text = 'update users set username = $1, firstname = $2, lastname = $3, email = $4, isadmin = $5, telephone = $6, address = $7 where userid = $8 returning *';
        const values = [
            req.body.username,
            req.body.fname,
            req.body.lname,
            req.body.email,
            req.body.isadmin,
            req.body.phone,
            req.body.address,
            req.body.userid
        ];

        const dbRes = await pool.query(text, values);

        console.log(dbRes.rows[0]);
        res.status(200).json(dbRes.rows[0]);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const text = 'delete from users where userid = $1';
        const value = [req.body.userid];

        const dbRes = await pool.query(text, value);

        res.status(200).json(dbRes.rows[0]);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
};

const deleteCourse = async (req, res) => {
    try {
        const text = 'delete from course where courseid = $1';
        const value = [req.body.courseid];

        const dbRes = await pool.query(text, value);

        res.status(200).json(dbRes.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while deleting the course.' });
    }
};

const getCourse = async (req, res) => {
    try {
        console.log(`db getCourse`);
        const results = await pool.query('select courseid from course');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while getting courses.' });
    }
};

const displayCourses = async (req, res) => {
    try {
        const results = await pool.query('select * from course');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while displaying courses.' });
    }
};

const getStudentsInCourse = async (req, res) => {
    try {
        const text = 'SELECT firstname, lastname, userid FROM users WHERE users.userid IN (SELECT user_id FROM users_courses WHERE course_id = $1)';
        const values = [req.query.courseid];

        const dbRes = await pool.query(text, values);

        console.log(dbRes.rows);
        res.status(200).json(dbRes.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while getting users.' });
    }
};

const registerUserForCourse = async (req, res) => {
    try {
        const text = 'insert into users_courses(user_id, course_id) values ($1, $2) returning *';
        const values = [
            req.body.userid,
            req.body.courseid
        ];

        const dbRes = await pool.query(text, values);

        console.log(dbRes.rows[0]);
        res.status(200).json(dbRes.rows[0]);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while registering the user for the course.' });
    }
};

const getUserCourses = async (req, res) => {
    try {
        const text = 'SELECT courseid, title, description, schedule, classroom_number, maximum_capacity, credit_hours, tuition_cost FROM course WHERE course.courseid in (SELECT course_id FROM users_courses WHERE user_id = $1);';

        const dbRes = await pool.query(text, [req.auth.userid]);

        res.status(200).json(dbRes.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while getting the user\'s course list.' });
    }
};

const getAdminCourses = async (req, res) => {
    try {
        const results = await pool.query('select * from users_courses');
        console.log(results.rows);
        res.status(200).json(results.rows);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while getting admin courses.' });
    }
};

const dropUserCourse = async (req, res) => {
    try {
        const text = 'DELETE FROM users_courses WHERE user_id = $1 AND course_id = $2';
        const values = [
            req.auth.userid,
            req.body.course_id
        ];

        await pool.query(text, values);

        await getUserCourses(req, res);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while dropping a course.' });
    }
};

const adminDropCourse = async (req, res) => {
    try {
        const text = 'DELETE FROM users_courses WHERE user_id = $1 AND course_id = $2';
        const values = [
            req.body.userid,
            req.body.courseid
        ];

        await pool.query(text, values);

        res.status(200).json({ message: 'Course dropped successfully.' });
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ error: 'An error occurred while dropping a course.' });
    }
};

module.exports = {
    login,
    addUser,
    addCourse,
    getUser,
    getUserId,
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
    getUserList,
    adminDropCourse
};
