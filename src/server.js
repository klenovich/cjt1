const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('reminders.db');

// Step 9: Implement the necessary server-side routes for user registration, login, and reminders management
const router = express.Router();

// User registration
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert the user into the database
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      res.status(200).json({ message: 'User registered successfully' });
    }
  });
});

// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user from the database
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to login' });
    } else if (!row) {
      res.status(401).json({ error: 'Invalid username or password' });
    } else {
      // Compare the password
      const passwordMatch = bcrypt.compareSync(password, row.password);

      if (passwordMatch) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    }
  });
});

// Your other routes for reminders management go here

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});