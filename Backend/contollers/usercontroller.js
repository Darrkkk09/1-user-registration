const userModel = require('../models/usermodel');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const Blacklist = require('../models/blist');
// const authMW = require('../middlewares/authMWare');

module.exports.registerUser = async (req, res, next) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstName, lastName, email, password } = req.body;
    // console.log(firstName, email, password);
    const hashedPassword = await userModel.hashedPassword(password);
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await userService.createUser({
            firstName : firstName,
            lastName : lastName,
            email,
            password: hashedPassword
        });
        const token = user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (error) {
        next(error);
    }
};
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    const chck = await user.comparePassword(password);
    
    if(!user && !chck) {
        return res.status(401).json({ message: 'Invalid email or password' });
    } 
    
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(200).json({ token, user });
    
};
module.exports.getprofile = async(req,res) => {
    const user = req.user;
    return res.status(200).json({ user });
};
module.exports.logoutUser = async (req, res) => {
    
    try {
    res.clearCookie('token');
    const token = req.headers.authorization || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await Blacklist.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
    return next();
    } catch (error) {
        return res.status(500).json({ message: 'Error logging out' });
    }
};