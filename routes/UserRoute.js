const route = require('express').Router()
const { DeleteUser, LoginUser, RegisterNewUser, getAllUsers, getUserById } = require('../Controller/UserController')

route.route('/register')
    .post(RegisterNewUser) 
route.route('/login')
    .post(LoginUser)
route.route('/:id')
    .delete(DeleteUser)
    .get(getUserById)
route.route("/")
    .get(getAllUsers)
module.exports = route