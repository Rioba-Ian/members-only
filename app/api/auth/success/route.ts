import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
 const { getUser } = getKindeServerSession();
 const user = await getUser();

 if (!user || user == null || !user?.id) {
  throw new Error("something went wrong in authentication" + user);
 }

 const dbUser = await db.select().from(users).where(eq(users.kindeId, user.id));

 if (dbUser.length == 0) {
  await db
   .insert(users)
   .values({
    kindeId: user.id,
    firstName: user.given_name,
    lastName: user.family_name,
    email: user.email,
   })
   .returning();
 }

 return NextResponse.redirect(process.env.KINDE_SITE_URL as string);
}
