const express = require('express')
const usersController = require('../controllers/UserController')
const router = express.Router()

router.get('/users', usersController.getAllUsers)

router.get('/users/:id', usersController.getUserById)

router.post('/users', usersController.createUser)

router.put('/users/:id', usersController.updateUserById)

router.delete('/users/:id', usersController.deleteUserById)

module.exports = router;