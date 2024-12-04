import User from '../models/user.model.js';

export const signUp = async (req, res) => {
    //Destructering request body
    const { username, email, password } = req.body;

    //Creating new user instance and saving request body variables to model
    const newUser = new User({ username, email, password })

    //TryCatch saving user to db
    try {
        //Saving new user instance and creating a user in db
        const savedUser = await newUser.save();
        //return succesful request status code 
        res.status(201).json('User created succesfully!');
    } catch (error) {
        const errors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ errors });
        
    }
}