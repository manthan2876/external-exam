const User = require('../models/user-model');

const home = async (req, res) => {
    try {
        res.status(200).json({ message: "Welcome to the API" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const UserExist = await User.findOne({email});

        if(UserExist){
            return res.status(400).json({ message: "User already exists" });
        }
        const userCreated = await User.create( { username, email, phone, password } );

        res.status(201).json({ message: "User registered successfully", userId: userCreated._id.toString()});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const UserExist = await User.findOne({email});

        if(!UserExist){
            res.status(400).json({ message: "Invalid credential"});
        }

        if(await UserExist.comparePassword(password)){
            res.status(200).json({ message: "Login successfull", userId: UserExist._id.toString()});
        } else {
            res.status(401).json({ message: "Invalid email or password"});
        }

    } catch (error){
        res.status(500).json({error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const UserExist = await User.findOne({email});

        if(!UserExist){
            res.status(400).json({ message: "Invalid credential"});
        }

        if(await UserExist.comparePassword(password)){
            User.deleteOne({email});
            res.status(200).json({ message: "User deletion successfull", userId: UserExist._id.toString()});
        } else {
            res.status(401).json({ message: "Invalid email or password"});
        }

    } catch (error){
        res.status(500).json({error: error.message });
    }
}

const updateUser = async (req,res) => {
    try {
        const {username, email, password, phone} = req.body;

        const UserExist = await User.findOne({email});

        if(!UserExist){
            res.status(400).json({ message: "Invalid credential"});
        }

        if(await UserExist.comparePassword(password)){
            await User.findByIdAndUpdate({email});
            res.status(200).json({ message: "User updation successfull", userId: UserExist._id.toString()});
        } else {
            res.status(401).json({ message: "Invalid email or password"});
        }

    } catch (error){
        res.status(500).json({error: error.message });
    }
}


module.exports = { home , register , login, deleteUser, updateUser };