// API untuk semak sama ada pengguna sudah wujud
import connectDB from "@/lib/mongoDB";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    // Semak sama ada pengguna sudah wujud
    const user = await User.findOne({ email });

    return NextResponse.json({ user: !!user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
