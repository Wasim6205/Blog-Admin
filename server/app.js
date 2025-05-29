const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
require("dotenv").config();
require("./conn/conn")

const userApi = require("./routes/user.route.js")
const adminApi = require("./routes/admin.route.js")
const categoryApi = require("./routes/category.route.js")
const blogsApi = require("./routes/blogs.route.js")

app.use(cors(
    {
        // origin:["http://localhost:5173"],
        origin:["https://blog-admin-35c9.onrender.com"],
        credentials:true
    }
));

app.use(express.json());
app.use(cookieParser())


// app.get("/", (req,res) => {
//     res.send("Hello from server side")
// })

// calling routes
app.use("/api/v1",userApi)
app.use("/api/v1",adminApi)
app.use("/api/v1",categoryApi)
app.use("/api/v1",blogsApi)

// server
app.listen(process.env.PORT, ()=> {
    console.log(`Server Started at ${process.env.PORT}`);
})
