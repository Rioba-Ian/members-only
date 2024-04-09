import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
 const { getUser } = getKindeServerSession();
 const user = await getUser();

 if (!user || user == null || !user?.id) {
  console.error("User data not available during build for /api/auth/success");
  // Optionally return a specific response indicating the issue
  // return NextResponse.json({ message: "User data unavailable" });
  return NextResponse.redirect(process.env.KINDE_SITE_URL as string);
 }

 const dbUser = await db.select().from(users).where(eq(users.kindeId, user.id));

 if (dbUser.length === 0) {
  // Optional data validation
  const validatedUser = {
   kindeId: user.id,
   firstName: user.given_name || "",
   lastName: user.family_name || "",
   email: user.email || "",
  };

  await db.insert(users).values(validatedUser).returning();
 }

 return NextResponse.redirect(process.env.KINDE_SITE_URL as string);
}
