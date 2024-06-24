import { connect } from "@/db/config";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { email, password } = req;
    console.log(req);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }

    const validpassword = await bcryptjs.compare(password, user.password);

    if (!validpassword) {
      return NextResponse.json(
        { message: "Invalied password" },
        { status: 400 }
      );
    }

    console.log("======================================");

    const token = {
      id: user._id,
      username: user.username,
    };

    const accessToken = await jwt.sign(token, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Logged In successfully",
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
