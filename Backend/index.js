import app from "./src/app.js"
import dotenv from "dotenv"
import { db } from "./src/database/index.js"
dotenv.config()
const port = process.env.PORT

db().then(()=>{
    app.listen(port,()=>console.log(`Port is Running on ${port}`))
})
.catch(err=>{
    console.log(`server error : ${err.message}`)
    process.exit(1)
})