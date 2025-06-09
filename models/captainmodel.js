const mong = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const capSchema = new mong.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    socketId: {
        type: String,
        // default: null
    },

    Vplate:{
        type: String,
        required: true
    },
    Vtype: {
        type: String,
        required: true,
        enum: ['car', 'bike', 'auto']
    },
    location:{
        lat : {
            type: Number,
            
        },
        lng : {
            type: Number,
        }
    }

});

capSchema.methods.generateAuthToken = function(){
const token = jwt.sign(
  { _id: this._id },         
  process.env.JWT_SECRET,    
  { expiresIn: '24h' }    
);
return token;
}
capSchema.statics.hashedPassword = (pass) =>{
    return bcrypt.hash(pass, 10);
};
capSchema.methods.comparePassword = async function(pass) {
    return await bcrypt.compare(pass, this.password);
}


const captain = mong.model('captain', capSchema);
module.exports = captain;