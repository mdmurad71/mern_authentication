

const users = require("../model/userSchema");

// const category = require('../models/categorySchema');


exports.adduser = async (req, res) => {

    const { name, email, phone, password, confirm_password } = req.body;
    if (!name || !email || !phone || !password || !confirm_password) {
        res.status(422).json('pls fill the data')
    }

    try {
        const preuser = await users.findOne({ email: email });
        console.log(preuser);
        if (preuser) {
            res.status(422).json('user already exists')
        } else {
            const saveUser = new users({ name, email, phone, password, confirm_password });
            await saveUser.save();
            res.status(201).json(saveUser);
            console.log(saveUser);
        }
    } catch (error) {
        res.status(422).json(error);
    }
}