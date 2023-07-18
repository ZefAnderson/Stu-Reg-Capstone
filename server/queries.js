const pg = require('pg');
const connectionString = process.env.DATABASE_URL;

const client = new pg.Client(connectionString);

client.connect();

const addStudent = (req, res) => {
    const text = 'insert into users(username, email, hash, isadmin, firstname, lastname, telephone, address, createdate) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *';
    const values = [
        req.body.username, req.body.email, req.body.hash, req.body.isadmin, req.body.firstname, req.body.lastname, req.body.telephone, req.body.address, req.body.createdate
    ]
    client.query(text, values, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(res.rows[0])
        }
    });
}