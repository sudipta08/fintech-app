const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

userSchema.statics.CheckUserCredentials = async function(email, password){
    const user = await model.findOne({email});
    if(!user){
        throw new Error('Invalid credentials');
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if(!hashedPassword){
        throw new Error('Invalid credentials');
    }
    return user;
};

const model = mongoose.model('User', userSchema);

module.exports = model;