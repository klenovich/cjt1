   const sqlite3 = require('sqlite3').verbose();

   const db = new sqlite3.Database('reminders.db');

   // Create the users table if it doesn't exist
   db.run(`
     CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       username TEXT UNIQUE,
       password TEXT
     )
   `);

   // Your database code goes here

   module.exports = db;