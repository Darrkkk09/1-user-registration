const mongoose = require('mongoose');
const cap = require('../models/captainmodel');
const dotenv = require('dotenv');
dotenv.config();


module.exports.createCap = async ({ firstName, lastName, email, password, Vplate, Vtype }) => {
  try {
    if (!firstName || !email || !password || !Vplate || !Vtype) {
      throw new Error("All fields are required");
    }

    const exists = await cap.findOne({ email });
    if (exists) {
      throw new Error("Captain with this email already exists");
    }

    const captain = await cap.create({
      firstName,
      lastName,
      email,
      password,
      Vplate,
      Vtype,
      location: {
        lat: 0, 
        lng: 0  
      }
    });

    await captain.save();  
    return captain;

  } catch (err) {

    throw err;  
  }
};