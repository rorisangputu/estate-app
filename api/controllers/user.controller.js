export const test = (req, res) => {
    res.send('OLA BOLA')
}

export const updateUserInfo = (req, res, next) => {

    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account') )
}