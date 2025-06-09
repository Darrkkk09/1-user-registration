// auth for profile

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usermodel');
const Blacklist = require('../models/blist');
const dotenv = require('dotenv');
dotenv.config();

module.exports.authOrNo = async(req,res,next) =>{
    const tkn = req.headers.authorization || req.cookies.token;
    if (!tkn) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblack = await Blacklist.findOne({ token: tkn });
    if (isblack) {
        return res.status(200).json({ message: 'Logout success' });
    }


    try {
        const decded = jwt.verify(tkn, process.env.JWT_SECRET);
        const user = await userModel.findById(decded._id);
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user; 
        // console.log(req.user);
        next(); 
    }
    catch(err)
    {
        return res.status(401).json({ message: 'Invalid token' });
    }
};


