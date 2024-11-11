// API untuk pendaftaran pengguna
import connectDB from "@/lib/mongoDB";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Semak sama ada pengguna sudah wujud
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Pengguna sudah wujud" },
        { status: 400 }
      );
    }

    // Hash kata laluan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cipta pengguna baru
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "Pendaftaran berjaya" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
