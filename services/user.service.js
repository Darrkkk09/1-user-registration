const userModel = require("../models/usermodel");

module.exports.createUser = async (userData) => {
    try {
        const { firstName, lastName, email, password } = userData;

        if (!firstName || !email || !password) {
            throw new Error("All fields are required");
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const user = new userModel({
            firstName: firstName,
            lastName: lastName,
            email,
            password,
        });

        await user.save();
        return user;
    } catch (err) {
        throw err; 
    }
};