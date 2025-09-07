const { UnauthenticatedError } = require('../errors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');



const auth =  async (req , res , next) => {
    const authHeader = req.headers.authorization;
    console.log(req.headers.authorization);
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Unauthorized login');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token , process.env.JWT_SECRET);
        const user = await User.findById(payload.userId).select('-password');
        if (!user) {
            throw new UnauthenticatedError('User not found');
        }
        req.user = { userId: user._id.toString(), name: user.name };
        console.log(req.user);
        next();
    } catch(err) {
        throw new UnauthenticatedError('Unauthorized login');
    }

}

module.exports = auth;
