const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3002;
const app = express();
const query = require("./queries")
const {expressjwt} = require('express-jwt')


const auth = expressjwt({
  secret:process.env.SECRET,
  algorithms: ['HS256']
})


app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(express.json());

// this route makes the client side routing work.
// see https://sentry.io/answers/why-don-t-react-router-urls-work-when-refreshing-or-writing-manually/
// app.get("/*", function (req, res) {
//   const indexPath = path.join(__dirname, "index.html");
//   console.log(`indexPath: ${indexPath}`);
//   res.sendFile(indexPath, function (err) {
//     res.status(500).send(indexPath);
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.get("/api", (req, res) => {
  res.json({ message: "Hello there!" })
})

app.post("/api/login", query.login);

app.post("/api/registration", query.addUser);

app.get("/api/courses", query.displayCourses);

app.get("/api/userprofile", auth, query.getUser);

app.post("/api/updateuser", query.updateUser);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
