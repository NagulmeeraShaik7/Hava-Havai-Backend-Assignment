const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dbFilePath = path.join(__dirname, "database.sqlite");
const dbSchema = fs.readFileSync(path.join(__dirname, "schema.db"), "utf-8");

const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to SQLite database");
    db.exec(dbSchema, (err) => {
      if (err) {
        console.error("Error creating tables", err.message);
      } else {
        console.log("Database schema created");
      }
    });
  }
});

module.exports = db;
