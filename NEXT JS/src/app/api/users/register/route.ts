import { connect } from "@/db/config";
import { User } from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { username, email, password } = req;
    console.log(req);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    //password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const saveuser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //send verification email
    const ee = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: saveuser._id,
    });
    console.log(ee);

    return NextResponse.json({
      success: true,
      message: "user register successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
