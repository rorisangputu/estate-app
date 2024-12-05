import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'

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
        
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'Invalid Credentials'))
    } catch (error) {
        next(error);
    }

}