'use strict'
const express = require('express')
const routes = express.Router()

const userController = require('./controllers/userController')
const authService = require('./services/authService')

routes.get('/users', userController.index)
routes.get('/profile', userController.getById)
routes.post('/users/create', userController.create)
routes.patch('/profile', userController.update, authService.authorize)
routes.delete('/users/:id', userController.delete)

routes.post('/authenticate', userController.authenticate)
// routes.post('/refreshToken', authService.authorize, userController.refreshToken);

module.exports = routes
