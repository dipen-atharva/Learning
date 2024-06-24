import { connect } from "@/db/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successfully",
    });

    response.cookies.delete("accessToken");

    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
