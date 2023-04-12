


const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

});

userSchema.pre('save', async function (next) {
    console.log('it is working');
    try {
        // console.log(this.password, this.confirm_password);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        console.log(hashedPassword);
        const confirmHashedPassword = await bcrypt.hash(this.confirm_password, salt);
        this.confirm_password = confirmHashedPassword;
        next()
    }

    catch (error) {
        next(error)
    }

});


userSchema.methods.generateAuthToken = async function () {
    try {
        let tok = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: tok });
        await this.save();
        return tok;
    } catch (error) {
        console.log(error);
    }
}


const users = new mongoose.model("users", userSchema);


module.exports = users;

