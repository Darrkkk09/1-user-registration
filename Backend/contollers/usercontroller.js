const userModel = require('../models/usermodel');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

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