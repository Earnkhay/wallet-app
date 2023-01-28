import asyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

//create user. POST /api/users
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exists
    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name, email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
})

//Authenticate a user. POST /api/users/login
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid credentials')
    }
})
//Get user data. GET /api/users/me. Private route
export const getUser = asyncHandler(async (req, res) => {
    const { _id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

//Get all users data. GET /api/users/users
export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password')

    res.status(200).json(users)
})

//generate a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}