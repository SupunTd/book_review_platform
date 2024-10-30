const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi"); // use for data validation
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({

    //user information
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    //sensitive data
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    signupDate: {type: Date,default: Date.now }
});

userSchema.methods.generateAuthToken = function () {

    return jwt.sign({_id: this._id}, "abc-def-ghi", {
        expiresIn: "7d",
    });
};

const User = mongoose.model("User", userSchema);

//this is the validation function for the user this is constant
const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().label("First Name"),
        middleName: Joi.string().label("Middle Name"),
        lastName: Joi.string().label("Last Name"),
        email: Joi.string().label("Email"),
        mobile: Joi.string().label("mobile"),
        password: passwordComplexity().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { User, validate };
