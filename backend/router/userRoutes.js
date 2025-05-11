const express = require("express")
const Product = require("../models/Products")
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Order = require("../models/Orders")

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
        if (exists) return res.status(400).json({ msg: "User already exists", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "User registered", status: true });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Login
Router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "User not found", isSuccess: false });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials", isSuccess: false });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.json({ user: { id: user._id, name: user.name, email: user.email }, isSuccess: true });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});


Router.get("/check-auth", (req, res) => {
    console.log("Check Auth API Route Requested")
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ isLoggedIn: false });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ isLoggedIn: true, user: decoded });
    } catch {
        res.status(401).json({ isLoggedIn: false });
    }
});

Router.post("/orders", async (req, res) => {
    const { uId } = req.body
    try {

        const Orders = await Order.find({ userId : uId })
        if (!Orders) { res.json({ mesg: "Orders not found" }) }

        res.json(Orders)
    } catch (err) {
        res.json(err)
    }

})



module.exports = Router