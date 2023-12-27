const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mysql = require('mysql');

const app = express();
const port = 5000;
const secretKey = 'RGbiaha8QE5BBn2L1qMnnAWKLY1U6FZa';
const saltRounds = 10;

// Create MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  //   password: 'your_password',
  database: 'NewUserDB',
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// ...

// ...

const generateConfirmationCode = async (length) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeArray = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    codeArray.push(characters.charAt(randomIndex));
  }

  return codeArray.join('');
};

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

    // Insert user into the database with hashed password
    const insertUserQuery =
      'INSERT INTO users (email, password, username, phoneNumber) VALUES (?, ?, ?, ?)';
    const result = await query(insertUserQuery, [
      email,
      hashedPassword,
      username,
      phoneNumber,
    ]);

    const userId = result.insertId;

    // Generate and store email confirmation code
    const confirmationCode = '2624shd';
    const insertConfirmationQuery =
      'INSERT INTO email_confirmations (user_id, confirmation_code) VALUES (?, ?)';

    // Check if confirmationCode is not empty before executing the query
    if (confirmationCode) {
      await query(insertConfirmationQuery, [userId, confirmationCode]);

      // Send confirmation email
      sendConfirmationEmail(email, confirmationCode);

      const token = generateToken({ email, username }); // Generate JWT token
      res.status(201).json({ message: 'Signup successful', token });
    } else {
      console.error('Error generating confirmation code');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  // Existing login code...

  const { identifier, password } = req.body;

  // Check user credentials using email or username
  const getUserQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
  const result = await query(getUserQuery, [identifier, identifier]);

  // Existing login code...
});

// Confirm email endpoint
app.post('/confirm-email', async (req, res) => {
  const { email, confirmationCode } = req.body;

  if (!email || !confirmationCode) {
    return res
      .status(400)
      .json({ error: 'Email and confirmation code are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into the database with hashed password
    const insertUserQuery =
      'INSERT INTO users (email, password, username, phoneNumber) VALUES (?, ?, ?, ?)';
    const result = await query(insertUserQuery, [
      email,
      hashedPassword,
      username,
      phoneNumber,
    ]);

    const userId = result.insertId;

    // Generate and store email confirmation code
    const confirmationCode = 'Dsae378';

    if (confirmationCode) {
      const insertConfirmationQuery =
        'INSERT INTO email_confirmations (user_id, confirmation_code) VALUES (?, ?)';

      await query(insertConfirmationQuery, [userId, confirmationCode]);

      // Send confirmation email
      sendConfirmationEmail(email, confirmationCode);

      const token = generateToken({ email, username }); // Generate JWT token
      res.status(201).json({ message: 'Signup successful', token });
    } else {
      console.error('Error generating confirmation code');
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  // Implementation of logout logic (clearing tokens, session, etc.)
  res.status(200).json({ message: 'Logout successful' });
});

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function query(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});
function sendConfirmationEmail(email, confirmationCode) {
  const mailOptions = {
    from: 'baluuu0317@gmail.com', // Replace with your email
    to: email,
    subject: 'Email Confirmation',
    text: `Your confirmation code is: ${confirmationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending confirmation email:', error);
    } else {
      console.log('Confirmation email sent:', info.response);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
