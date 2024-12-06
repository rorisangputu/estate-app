import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'

export const updateUserInfo = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account'))
    
    try {

        if (req.user.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            
        })
    } catch (error) {
        next(error);
    }
}