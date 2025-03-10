const {User , UserLogin , UserUpdateValidate , UserValidate } = require('../Modules/User')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/**
 * @desc Register New User
 * @route POST /api/auth/register
 * @access Public
 */

const RegisterNewUser = asyncHandler(async (req, res) => {
    const { error } = UserValidate(req.body)
    if (error) {
        return res.status(400).json({message : error.details[0].message})
    }
    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) return res.status(400).send("User already exists");
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    await user.save()
    res.status(201).json({ message: "User Created Successfully" });
})

/**
 * @desc Login
 * @route GET /api/auth/login
 * @access Public
 */

const LoginUser = asyncHandler(async (req, res) => {
    const { error } = UserLogin(req.body)
    if (error) {
        res.status(400).json({message : error.details[0].message})
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400).json({message : "Email or Password are not Correct"})
    }
    const validPassword = await bcrypt.compare(req.body.password , user.password)
    if (!validPassword) {
        return res.status(400).send("Invalid email or password");
    }
    const token = jwt.sign({ _id: user._id , isAdmain: user.isAdmin }, process.env.TOKEN_SECRET);
    const { password, ...others } = user._doc
    res.send({ ...others, token });
})

/**
 * @desc get All Users
 * @route GET /api/auth
 * @access public
 */

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

/**
 * @desc get user by id
 * @route GET /api/auth/:id
 * @access public
 */

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    res.status(200).json(user)
})


/**
 * @desc delete User
 * @route DELETE /api/auth/:id
 * @access public
 */

const DeleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ message: "User Not Found" })
    }
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({message : "User Deleted Successfully"})
})

module.exports = {DeleteUser, LoginUser , RegisterNewUser , getAllUsers , getUserById}