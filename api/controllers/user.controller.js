import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'
import { errorHandler } from '../utils/error.js';

export const updateUserInfo = async (req, res, next) => {
    
    //Checking whether the user who sent the request has the same id
    //as the user whos id is in the url
    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account'))
    
    try {
        //Hashing password if user has changed their password
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            //Ensuring that users can only update these properties
            //Avoiding potential risk by disabling ability to insert properties for higher level user
            //such as admins

            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar
            }
        }, { new: true }) //returns update users information
        
        const { password: pass , ...rest } = updateUser._doc;
        
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}

export const deleteUserInfo = async (req, res, next) => {
    
    //Checking whether the user who sent the request has the same id
    //as the user whos id is in the url
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only delete your own account'));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({ message: 'User has been deleted' });
    } catch (error) {
        next(error);
    }
    
} 