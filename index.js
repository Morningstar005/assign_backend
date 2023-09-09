const express  = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express();
const dotenv=require("dotenv")
const db = require("./config/database")
const userRouters = require("./routes/User")
const sessionRouters = require("./routes/session")
dotenv.config()

const PORT = process.env.PORT ||8099

db.connect()
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)

app.use("/api/v1/auth",userRouters)
app.use("/api/v1/session",sessionRouters)


app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running"
    })
});


app.listen(PORT,()=>{
    console.log(`The application is currently operating at a port of ${PORT}.`)
})

