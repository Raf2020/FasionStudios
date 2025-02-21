import { getUserByEmail } from "@/actions/users/user.action";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userEmail: string }> }
) => {
  const userEmail = (await params).userEmail;
  const userData = await getUserByEmail(userEmail);
  return NextResponse.json(userData);
};
