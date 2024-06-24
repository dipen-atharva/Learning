import mongoose from "mongoose";

export const db = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database conected!! Host : ${connection.connection.host}`);
  } catch (error) {
    console.log(`Database connection error : ${error.message}`);
    process.exit(1);
  }
};
