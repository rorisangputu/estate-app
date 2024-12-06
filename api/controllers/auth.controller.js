import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';

export const signUp = async (req, res, next) => {
    //Destructuring request body
    const { username, email, password } = req.body;

    //Encrypting password and adding salts
    const cryptPass = bcrypt.hashSync(password, 10);

    //Creating new user instance and saving request body variables to model
    //Adding encrypted password as password
    const newUser = new User({ username, email, password: cryptPass })

    //TryCatch saving user to db
    try {
        //Saving new user instance and creating a user in db
        await newUser.save();
        //Return succesful request status code 
        res.status(201).json('User created succesfully!');
    } catch (error) {
        next( error );
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //Checking whether email exists in Db
        const validUser = await User.findOne({ email });
        //If email is not found an error occurs
        if (!validUser) return next(errorHandler(404, 'User not found!'))
        
        //Checking whether entered password matches password in db
        const validPassword = bcrypt.compareSync(password, validUser.password);
        //Error if passwords do not match
        if (!validPassword) return next(errorHandler(401, 'Invalid Credentials'))
        
        //Web Token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {expiresIn: '30d'})
        
        //Adding token to cookie - setting time limit for session
        const tokenExpiry = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

        const { password: pass, ...userInfo } = validUser._doc;
        res.cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + tokenExpiry) })
            .status(200)
            .json(userInfo);
        
        
    } catch (error) {
        next(error);
    }

}

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...userInfo } = user._doc;

              //Adding token to cookie - setting time limit for session
            const tokenExpiry = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
            
            res
                .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + tokenExpiry) })
                .status(200)
                .json(userInfo)
            
        } else {
            const generatedPass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPass = bcrypt.hashSync(generatedPass, 10);
            const generatedUsername = req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);
            const newUser = new User({
                username: generatedUsername,
                email: req.body.email,
                password: hashedPass,
                avatar: req.body.photo,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...userInfo } = newUser._doc;

             //Adding token to cookie - setting time limit for session
            const tokenExpiry = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
            
            res
                .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + tokenExpiry) })
                .status(200)
                .json(userInfo)
        }

    } catch (error) {
        next(error);
    }
}