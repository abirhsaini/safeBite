const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const JWT_Secret = "geguergjndgdnfgjfnfsdieapa3435334vgedffsgdbds"
const Jwt_LifeTime = "1d"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email adress"
        },
        unique: true
    },
    password: {
        type: String,
    },
    token: { type: String },
    allergies: { type: Array }
}, { collection: "user " })


userSchema.methods.CreateJWT = function() {
    return jwt.sign({ userId: this._id }, JWT_Secret, { expiresIn: Jwt_LifeTime })
}
userSchema.methods.comparePassword = async function(candidate) {
    const isMatch = await bcrypt.compareSync(candidate, this.password)
    return isMatch
}
userSchema.methods.hashPassword = async function() {
    var salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hashSync(this.password, salt)
}

const User = mongoose.model("User", userSchema)
module.exports = User;