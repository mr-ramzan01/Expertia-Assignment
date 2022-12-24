const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const Users = require("../models/userModel.js");
dotenv.config();
const jwt_secret_key = process.env.JWT_SECRET_KEY;


async function isLoggedInUser(req, res) {
    try {
        const {token} = req.params;
        if(!token) {
            return res.status(401).send({
                success: true,
                message: 'token not provided'
            })
        }

        try {
            const data = jwt.decode(token, jwt_secret_key);
            console.log(data, 'data')
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
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}
async function LoginUser(req, res) {
    try {
        // Checking User username
        let existingUser = await Users.findOne({username: req.body.username});
        if(!existingUser) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        const passwordMatches = await bcrypt.compare(req.body.password, existingUser.password);
        if(passwordMatches) {

            // Generating token
            const token = jwt.sign({
                email: existingUser.email,
                username: existingUser.username,
                _id: existingUser._id,
            }, jwt_secret_key);
            
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
        // return next(new ErrorHandler(error, 500));
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

        const options = {
            expires: new Date(Date.now() + 30*24*60*60*1000),
            // maxAge: 500000000,
            httpOnly: true,
            // secure: true
        };
        res.status(200).send({
            success: true,
            message: 'Signup successfully',
            token: token
        })
    } catch (error) {
        // return next(new ErrorHandler(error, 500));
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
}



module.exports = { SignUPUser, LoginUser, isLoggedInUser };