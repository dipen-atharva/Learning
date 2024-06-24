import { User } from "@/model/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const token = await bcryptjs.hash(userId.toString(), salt);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 30 * 60 * 1000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: Date.now() + 30 * 60 * 1000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "72ff6be8038aac",
        pass: "88851fb7ad8181",
      },
    });

    const mailOptions = {
      from: "prince.khant@atharvasystem.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${token}">Hear</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
