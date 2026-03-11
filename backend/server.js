const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "mysql",
  user: "root",
  password: "password",
  database: "loginapp"
});

db.connect(err => {
  if (err) {
    console.log("DB connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {

      if (err) return res.status(500).send(err);

      if (result.length > 0)
        res.json({ message: "Login Success" });
      else
        res.status(401).json({ message: "Invalid Credentials" });

    }
  );

});

app.get("/health", (req,res)=>{
  res.send("Backend running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
