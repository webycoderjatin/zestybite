const express = require("express")
const Admin = express.Router()
const Product = require("../models/Products")
const User = require("../models/User")

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

Admin.get("/u/:id",async (req,res)=>{
    const id = req.params.id
    try{
        const UserData = await User.findById(id)
        if(!UserData){ res.json(400).send({msg:"User Not Found"})}
        res.json(UserData)
    }catch(err){
        res.json(err)
    }
})



module.exports = Admin