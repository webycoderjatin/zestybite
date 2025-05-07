const express = require("express")
const Product = require("../models/Products")

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




module.exports = Router