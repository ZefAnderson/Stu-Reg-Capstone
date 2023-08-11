const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
const query = require("./queries")
const { expressjwt } = require('express-jwt')
const morgan = require('morgan');
const winston = require('winston');
const { EventEmitter } = require('events');
const bus = new EventEmitter();
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const authConfig = {
  secret: secretKey,
  algorithms: ['HS256']
};
const auth = expressjwt(authConfig);
bus.setMaxListeners(15);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.use(express.json());

app.use(morgan('tiny'));

app.get("/api", (req, res) => {
  res.json({ message: "Hello there!" })
})

app.post("/api/login", query.login);

app.post("/api/registration", query.addUser);

app.post("/api/addcourse", query.addCourse);

app.get("/api/courses", query.displayCourses);

app.get("/api/userprofile", auth, query.getUser);

app.post("/api/updateuser", auth, query.updateUser);

app.post("/api/courseupdate", query.updateCourse);

app.post("/api/adminupdate", query.updatePerAdmin);

app.get("/api/getstudents", query.getStudentsInCourse);

app.get("/api/getuserid", query.getUserId)

app.post("/api/registerforcourse", query.registerUserForCourse);

app.post("/api/usercourses", auth, query.getUserCourses);

app.get("/api/coursesadmin", query.getAdminCourses);

app.get("/api/userlist", query.getUserList);

app.post("/api/delete", query.deleteUser);

app.post("/api/coursedelete", query.deleteCourse);

app.delete("/api/dropcourse", auth, query.dropUserCourse);

app.delete("/api/admindrop", query.adminDropCourse);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
