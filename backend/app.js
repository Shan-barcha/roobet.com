const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const port = 5000;
const secretKey = 'RGbiaha8QE5BBn2L1qMnnAWKLY1U6FZa';
const saltRounds = 10;

// Create MySQL connection pool
const db = mysql.createPool({
  host: 'localhost',
  // port:3306,
  user: 'root',
  password: '3LCWbsdB7F6GGk8T',
  database: 'UserDB',
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', async (req, res) => {
  console.log('Received data:', req.body);

  const { email, password, username, phoneNumber } = req.body;

  if (!email || !password || !username || !phoneNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into database with hashed password
    const insertUserQuery =
      'INSERT INTO users (email, password, username, phoneNumber) VALUES (?, ?, ?, ?)';
    db.query(
      insertUserQuery,
      [email, hashedPassword, username, phoneNumber],
      (err, result) => {
        if (err) {
          console.error('Error signing up: ', err);
          return res
            .status(500)
            .json({ error: 'Internal Server Error', details: err.message });
        }

        const token = generateToken({ email, username }); // Generate JWT token
        res.status(201).json({ message: 'Signup successful', token });
      }
    );
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({
      error: 'Identifier (email or username) and password are required',
    });
  }

  // Check user credentials using email or username
  const getUserQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
  db.query(getUserQuery, [identifier, identifier], async (err, result) => {
    if (err) {
      console.error('Error logging in: ', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.length > 0) {
      const hashedPassword = result[0].password;

      try {
        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, hashedPassword);

        if (passwordMatch) {
          const token = generateToken({
            email: result[0].email,
            username: result[0].username,
          });
          res.status(200).json({ message: 'Login successful', token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});
const users = [
  { id: 1, name: 'John Doe', age: 25 },
  { id: 2, name: 'Jane Smith', age: 30 },
  { id: 3, name: 'Bob Johnson', age: 28 },
];

// Define a simple GET endpoint
app.get('/api/users', (req, res) => {
  res.json(users);
});


function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
}

app.listen();
