import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/lib/db";

export async function getAuthenticatedUser() {
 const { isAuthenticated, getUser } = getKindeServerSession();

 if (!(await isAuthenticated())) {
  return null;
 }

 const user = await getUser();

 const userDetails = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.kindeId, user?.id || ""),
 });

 return userDetails || null;
}
