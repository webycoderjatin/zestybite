const express = require("express")
const dotenv = require("dotenv")
const Router = require("./router/userRoutes")
const Admin = require("./router/adminRoutes")
const Payment = require("./router/payment")
const mongoose = require("mongoose");
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");

const app = express()
const PORT = 5000

dotenv.config()


app.use(cors({ origin: "http://localhost:5173" }));  // Frontend URL (React default port)

app.use(cookieParser());
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use("/" , Router)
app.use("/admin" , Admin)
app.use("/pay" , Payment)




app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`)
})