const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required: true,
        minlength: [4, 'First name must be at least 4 characters long']
    },
    lastName: {
        type: String,
        minlength: [4, 'Last name must be at least 4 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [6, 'Password must be at least 6 characters long']
    },
    socketID: {
        type: String,
    },
});



userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};



userSchema.statics.hashedPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;