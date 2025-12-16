const mysql = require('mysql');
const express = require('express');
const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 'dbpass',
  database: 'testdb'
});

// Multiple SQL Injection patterns that CodeQL will catch

// Pattern 1: String concatenation
function getUserById(id) {
  const query = "SELECT * FROM users WHERE id = " + id;
  connection.query(query);
}

// Pattern 2: Template literals
function getUserByName(name) {
  const query = `SELECT * FROM users WHERE name = '${name}'`;
  connection.query(query);
}

// Pattern 3: String concatenation with multiple params
function authenticate(username, password) {
  const sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  connection.query(sql);
}

// Pattern 4: Building query string
function searchUsers(searchTerm) {
  let query = "SELECT * FROM users WHERE ";
  query = query + "name LIKE '%" + searchTerm + "%'";
  connection.query(query);
}

// Pattern 5: Dynamic ORDER BY
function getSortedUsers(sortColumn) {
  const query = "SELECT * FROM users ORDER BY " + sortColumn;
  connection.query(query);
}

// Pattern 6: IN clause injection
function getUsersByIds(ids) {
  const query = "SELECT * FROM users WHERE id IN (" + ids + ")";
  connection.query(query);
}

module.exports = {
  getUserById,
  getUserByName,
  authenticate,
  searchUsers,
  getSortedUsers,
  getUsersByIds
};