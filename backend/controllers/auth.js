const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signin = async(req, res) => {
    const {email, username, password} = req.body
    
    try {
        
        const userExist = await User.findOne({$or:[{"email": email},{"username": username}]})
        

        if(!userExist) {
            return res.status(404).json({message : `User doesn't exist!`})
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExist.password)

        if(!isPasswordCorrect) {
            return res.status(400).json({message : `Invalid password!`})
        }

        const token = await jwt.sign({isAdmin: userExist.isAdmin, id:userExist._id}, process.env.TOKEN_SECRET, {expiresIn:'999 days'})

        return res.status(200).json({
                    result : {message : 'User logged in.',
                    userId : userExist._id,
                    username : userExist.username,
                    email: userExist.email,
                    isAdmin: userExist.isAdmin},
                    token
                })
    } catch (error) {
         return res.status(500).json({message : 'Something went wrong?'})
    }
    
}


exports.signup = async(req, res) => {
    const {username, email, password, confirmPassword} = req.body

    try {

        if(!username || !email || !password || !confirmPassword) {
            return res.status(400).json({message : 'Please add all fields.'})
        }

        userExist = await User.findOne({email})

        if(userExist) {
            return res.status(400).json({message : 'User already exist.'})
        }

        if(password !== confirmPassword){
            return res.status(400).json({message : `Passwords don't match.`})
        }
        
        salt = await bcrypt.genSalt(12)
        hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            username,
            email,
            password : hashedPassword
        })

        if(!user) {
            return res.status(400).json({message : `User not added. Please try again.`})
        }
        const token = await jwt.sign({isAdmin: user.isAdmin, id:user._id}, process.env.TOKEN_SECRET, {expiresIn:'999 days'})
        
        return res.status(201).json({
                result : {message : 'User created.',
                userId : user._id,
                username,
                email},
                token
            })
        

    } catch (error) {
        return res.status(500).json({message : 'Something went wrong?'})
    }
}