const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Users = require("../models/userModel.js");
dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;


async function isLoggedInUser(req, res) {
    try {
        const {token} = req.params;
        console.log(token, 'token')
        // checking token is present or not
        if(!token) {
            return res.status(401).send({
                success: false,
                message: 'token not provided'
            })
        }

        try {

            // getting all data from token and sending to client
            const data = jwt.verify(token, jwt_secret_key);
            console.log(data, 'data');
            return res.send({
                success: true,
                message: 'verified user',
                data: data
            })


        } catch (error) {
            return res.status(498).send({
                success: false,
                message: 'Invalid token'
            })
        }

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
async function LoginUser(req, res) {
    try {
        // Checking username
        let existingUser = await Users.findOne({username: req.body.username});

        // if user does not exist 
        if(!existingUser) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        // Hashing password
        const passwordMatches = await bcrypt.compare(req.body.password, existingUser.password);
        if(passwordMatches) {

            // Generating token
            const token = jwt.sign({
                email: existingUser.email,
                username: existingUser.username,
                _id: existingUser._id,
            }, jwt_secret_key);
            
            // Sending successfull response to client
            res.status(200).send({
                success: true,
                message: 'Login Successfully',
                token: token
            })
        }
        else {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



async function SignUPUser(req, res) {
    try {
        // Checking User 
        let user = await Users.findOne({ email: req.body.email });

        // if user already exists
        if(user) {
            return res.status(403).send({
                success: false,
                message: 'User already registered'
            })
        }
        // Hashing Password
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        // Creating User
        const newUser = await Users.create({...req.body, password: hashPassword});

        // Generating token
        const token = jwt.sign({
            email: newUser.email,
            username: newUser.username,
            _id: newUser._id,
        }, jwt_secret_key);

        // Sending successfull response to client
        res.status(201).send({
            success: true,
            message: 'Signup successfully',
            token: token
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



module.exports = { SignUPUser, LoginUser, isLoggedInUser };