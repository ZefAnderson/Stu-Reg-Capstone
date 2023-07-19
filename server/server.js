const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../client/dist")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello there!" })
})

app.post('/api/login', (req, res) => {
  console.log('/api/login endpoint reached');
  console.log(req.body);
  res.send('Hithere');
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
