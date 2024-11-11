// Fail untuk sambungan MongoDB
import mongoose from "mongoose";

// Fungsi untuk sambung ke database
const connectDB = async () => {
  try {
    // Semak sama ada sudah tersambung atau tidak
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Berjaya sambung ke MongoDB");
    }
  } catch (error) {
    console.error("Gagal sambung ke MongoDB:", error);
  }
};

export default connectDB;
