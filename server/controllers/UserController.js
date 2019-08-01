const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err){
      return handleSQLError(res, err)
    }
    return res.json(rows);
  });
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  pool.query('SELECT * FROM users WHERE ?', {id: `${req.params.id}`}, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  pool.query('INSERT INTO users SET ?', {first_name: `${req.body.first_name}`, last_name: `${req.body.last_name}`, user_name: `${req.body.user_name}`, password: `${req.body.password}`}, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}



const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  pool.query(`UPDATE users SET ? WHERE id = ${req.params.id}`, {first_name: `${req.body.first_name}`, last_name: `${req.body.last_name}`, user_name: `${req.body.user_name}`, password: `${req.body.password}`}, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.send(req.body);
  })
}

const deleteUserById = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  pool.query(`DELETE FROM users WHERE ?`, {id: `${req.params.id}`}, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}