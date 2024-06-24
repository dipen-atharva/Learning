import mongoose from "mongoose";

export async function connect(){
    try {
        const db = await mongoose.connect(process.env.MONGO_URL!)
        console.log(`Database Connected !! Host : ${db.connection.host}`)
    } catch (error:any) {
        console.log(`DataBase Connection Error : ${error.message}`)
    }
}