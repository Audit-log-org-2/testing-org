const express = require('express');
const mysql = require('mysql');
const { exec } = require('child_process');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123', // Hardcoded credential
  database: 'myapp'
});

// VULNERABILITY 1: SQL Injection (Direct string concatenation)
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// VULNERABILITY 2: SQL Injection (Template string)
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// VULNERABILITY 3: Command Injection
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec('ping -c 4 ' + host, (error, stdout, stderr) => {
    res.send(stdout);
  });
});

// VULNERABILITY 4: Command Injection (with shell)
app.get('/exec', (req, res) => {
  const cmd = req.query.cmd;
  exec(cmd, { shell: true }, (error, stdout) => {
    res.send(stdout);
  });
});

// VULNERABILITY 5: Path Traversal
app.get('/file', (req, res) => {
  const filename = req.query.name;
  const filepath = '/var/www/uploads/' + filename;
  fs.readFile(filepath, 'utf8', (err, data) => {
    res.send(data);
  });
});

// VULNERABILITY 6: XSS (Reflected)
app.get('/search', (req, res) => {
  const searchTerm = req.query.q;
  res.send('<h1>Search Results for: ' + searchTerm + '</h1>');
});

// VULNERABILITY 7: XSS (In HTML)
app.get('/welcome', (req, res) => {
  const username = req.query.name;
  res.send(`
    <html>
      <body>
        <h1>Welcome ${username}!</h1>
      </body>
    </html>
  `);
});

// VULNERABILITY 8: Insecure Random Number Generation
app.get('/token', (req, res) => {
  const token = Math.random().toString(36).substring(7);
  res.json({ token: token });
});

// VULNERABILITY 9: Weak Cryptography
app.post('/encrypt', (req, res) => {
  const data = req.body.data;
  const cipher = crypto.createCipher('des', 'weakkey123'); // DES is weak
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  res.json({ encrypted });
});

// VULNERABILITY 10: Hardcoded Secrets
const API_KEY = 'sk-1234567890abcdefghijklmnopqrstuvwxyz';
const AWS_SECRET = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';
const DB_PASSWORD = 'SuperSecret123!';

// VULNERABILITY 11: ReDoS (Regular Expression Denial of Service)
app.get('/validate-email', (req, res) => {
  const email = req.query.email;
  const regex = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;
  const isValid = regex.test(email);
  res.json({ valid: isValid });
});

// VULNERABILITY 12: Unvalidated Redirect
app.get('/redirect', (req, res) => {
  const url = req.query.url;
  res.redirect(url);
});

// VULNERABILITY 13: Cookie without HttpOnly flag
app.get('/set-cookie', (req, res) => {
  res.cookie('session', 'abc123', { httpOnly: false });
  res.send('Cookie set');
});

// VULNERABILITY 14: Insecure Direct Object Reference
app.get('/document/:id', (req, res) => {
  const docId = req.params.id;
  // No authorization check
  res.sendFile(`/documents/${docId}.pdf`);
});

// VULNERABILITY 15: Mass Assignment
app.post('/update-profile', (req, res) => {
  const userData = req.body;
  // Directly using all user input without filtering
  db.query('UPDATE users SET ? WHERE id = ?', [userData, req.session.userId]);
  res.send('Profile updated');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});