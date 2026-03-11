const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "database-1.c1k2ecysou5o.ap-south-1.rds.amazonaws.com",
  user: "Admin",
  password: "Admin12345",
  database: "loginapp",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log("RDS connection error:", err.message);
  } else {
    console.log("Connected to AWS RDS MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Backend API running");
});

app.get("/health", (req, res) => {
  res.send("Backend healthy");
});

app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(query, [username, password], (err, result) => {

    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length > 0) {
      res.json({ message: "Login success" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }

  });

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
