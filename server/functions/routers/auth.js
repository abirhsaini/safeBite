const express = require('express');
const router = express.Router();
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../model/User")
const bcrypt = require("bcryptjs")


router.post("/signup", async(req, res) => {
    const { username, email, password, conpassword } = req.body;

    if (!username || !email || !password || !conpassword) {
        return res.status(404).send(error = "please fill all")
    }
    const user = await User.create({ username, email, password })

    if (password !== conpassword) {
        return res.send(error = "verify your password")
    }
    user.hashPassword()
    try {
        await user.save()
        return res.status(201).send(user)
    } catch (error) {
        console.log(error)
        res.status(422).send("une erreur est survenu")

    }
})

router.get("/login", async(req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        console.log("hi bye ", email)
        res.status(400).json({ msg: "Please provide all values", email: email, password: password })

    }
    const user = await User.findOne({ email }).select('+password')
    console.log(user)
    if (!user) {
        return res.status(500).json({ msg: "invalid credentials" })
    }

    console.log(password)
    console.log(user)
    const isCorrect = await user.comparePassword(password)
    console.log(isCorrect)
    if (!isCorrect) {
        console.log("ma3ereft", email)
        res.status(500).json({ msg: "mot de passe incorrecte" })
    } else {
        res.status(200).json({ user })
    }

})


module.exports = router;