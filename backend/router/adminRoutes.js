const express = require("express")
const Admin = express.Router()
const Product = require("../models/Products")

Admin.get("/", (req, res) => {
    res.send("Admin page")
})

Admin.post("/addProducts", async (req, res) => {
    const { name, price, description, imageURL } = req.body
    try {
        const product = new Product({
            name,
            price,
            description,
            imageURL
        })
        await product.save()
        res.send("Product added successfully")
    } catch (err) {
        console.error(err)
    }


})



module.exports = Admin