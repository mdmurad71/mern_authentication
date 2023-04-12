

const users = require("../model/userSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        } else if (password !== confirm_password) {
            res.status(422).json('something wrong')

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

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            res.status(401).json('please fill the data')
        }

        const emailCheck = await users.findOne({ email: email });

        if (!emailCheck) {
            res.status(401).json('invalid credentials')

        } else {
            const passMatch = await bcrypt.compare(password, emailCheck.password);
            let token = await emailCheck.generateAuthToken();
            console.log(token);
            if (passMatch) {
                res.status(201).json('login successfull')

            } else {
                res.status(401).json('invalid credentials')

            }
        }

    } catch (error) {

    }
}