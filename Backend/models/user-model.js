const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

UserSchema.pre("save",async function(next){
    const user = this;
    if(!user.isModified("password"))
        next();
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password=hash_password;
        next();
    } catch(error){
        next(error);
    }
})


UserSchema.methods.comparePassword = async function(password){
    try{
        return bcrypt.compare(password,this.password);
    }catch(error){
        console.error(error);
    }
}

const User = new mongoose.model("User", UserSchema);

module.exports = User;