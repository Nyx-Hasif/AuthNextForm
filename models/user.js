// Definisi skema pengguna untuk MongoDB
import mongoose from "mongoose";

// Buat skema pengguna
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Semak sama ada model sudah wujud
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
