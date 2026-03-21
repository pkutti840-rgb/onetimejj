require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FreshCart Backend API' });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (err) => {
  console.error("Server encountered an error:", err);
});

server.on('close', () => {
  console.log("Server closed.");
});

process.on('SIGINT', () => {
  console.log("Caught SIGINT, shutting down.");
  server.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log("Caught SIGTERM, shutting down.");
  server.close();
  process.exit(0);
});
