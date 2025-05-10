const express = require("express")
const Product = require("../models/Products")
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Router = express.Router()

Router.get("/", (req, res) => {
    res.send("Hello from server")
})

Router.get("/products", async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

Router.get("/order/:id", async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(404).send("Product not found")
        }
        res.json(product)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
})

Router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "User registered" });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login
Router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.json({ user: { id: user._id, name: user.name, email: user.email } });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});






module.exports = Router