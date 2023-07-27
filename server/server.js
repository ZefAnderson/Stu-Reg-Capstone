const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
const query = require("./queries")


app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello there!" })
})

app.post("/api/login", query.login);

app.post("/api/registration", query.addUser);

app.get("/api/courses", query.displayCourses);

app.get("/api/userprofile", query.getUser);

app.post("/api/updateuser", query.updateUser);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
