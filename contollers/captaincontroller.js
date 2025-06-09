const captainModel = require('../models/captainmodel');
const captainserv = require('../services/captainserv');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv');
const blist = require('../models/blist');
dotenv.config();

module.exports.register = async (req, res, next) => {
    try {
        // console.log(req.body);

        const { firstName, lastName, email, password, Vplate, Vtype } = req.body;
        if (!firstName || !email || !password || !Vplate || !Vtype) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (await captainModel.findOne({ email: email })) {
            return res.status(400).json({ error: "Captain with this email already exists" });
        }

        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ errors: err.array() });
        }

        const hashedPwd = password;
        
        const captain = await captainserv.createCap({
            firstName,
            lastName,
            email,
            password: hashedPwd,
            Vplate,
            Vtype
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ message: "Captain registered successfully", token : token, captain: captain });
    } catch (err) {
        console.error("Error in captain registration:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
module.exports.login =  async(req, res, next) => {
    try{
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ errors: err.array() });
        }
        const {email,password} = req.body;
        if (!email && !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        const captain = await captainModel.findOne({ email}).select('+password');
        const pass = await captain.comparePassword(password);
        // console.log( pass);
        if (!captain && !pass) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ message: "Captain logged in successfully", token: token, captain: captain });

    }
    catch(err){
        console.error("Error in captain login:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
module.exports.profile = async(req, res, next) => {
    try {

        res.status(200).json({ message: "Captain profile fetched successfully", captain: req.captain });
    } catch (err) {
        console.error("Error fetching captain profile:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}
module.exports.logout = async (req, res, next) => {
    try {
        const t = req.headers.authorization || req.cookies.token;
        if (!t) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await blist.create({ token: t });
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    }
    catch (err) {
        console.error("Error in captain logout:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};
