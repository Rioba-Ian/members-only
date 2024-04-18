"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { posts, users } from "@/lib/db/schema";
import { getAuthenticatedUser } from "@/utils/user";
import { eq } from "drizzle-orm";
import { ADMIN_PASSCODE, MEMBER_PASSCODE } from "@/utils/constants";

export type ErrorState = {
 error?: { title: string | undefined; message?: string | undefined } | null;
 message: string | undefined;
};

export default async function createPost(
 prevState: ErrorState | null,
 formData: FormData
): Promise<ErrorState | null> {
 const schema = z.object({
  title: z
   .string({
    required_error: "Title is required to create a post.",
   })
   .min(2),
  content: z
   .string({
    required_error: "Content length is required",
   })
   .min(2)
   .max(256, "Content length cannot exceed 256 characters."),
 });

 const parse = schema.safeParse({
  title: formData.get("title"),
  content: formData.get("content"),
 });

 if (!parse.success) {
  return { ...prevState, message: parse.error.errors[0].message };
 }

 // check that the user is authorized: i.e: is a member or admin, user the user id also
 const userDetails = await getAuthenticatedUser();
 const data = parse.data;

 if (!userDetails || userDetails.role === "user") {
  return {
   ...prevState,
   error: {
    title: "Unauthorized error",
    message: "You are not authorized to create a post.",
   },
   message: "Unauthorized error",
  };
 }

 console.log("create a post here...");

 console.log(userDetails);

 try {
  const res = await db.insert(posts).values({
   title: data.title,
   body: data.content,
   userId: userDetails.id,
  });

  console.log(data);
  revalidatePath("/");
 } catch (err) {
  return {
   ...prevState,
   error: { title: "Failed to create a post", message: "Database error" },
   message: "Failed to create a post",
  };
 }
 redirect("/");
}

export async function upgradeToMember(prevState: any, formData: FormData) {
 const userDetails = await getAuthenticatedUser();

 if (!userDetails) {
  return { message: "You are not logged in." };
 }

 const memberPassword = formData.get("memberpasscode");

 if (!memberPassword) {
  return { message: "Member passcode is required." };
 }

 if (memberPassword !== MEMBER_PASSCODE) {
  return {
   message:
    "Wrong Passcode. Check around for hints and try again.\n Check out https://github.com/Rioba-Ian/members-only",
  };
 }

 try {
  const res = await db
   .update(users)
   .set({ role: "member" })
   .where(eq(users.id, userDetails.id));
  revalidatePath("/");
 } catch (err) {
  return { message: "Database error: Failed to update membership." };
 }
 redirect("/");
}

export async function upgradeToAdmin(prevState: any, formData: FormData) {
 const userDetails = await getAuthenticatedUser();

 if (!userDetails) {
  return { message: "You are not logged in." };
 }

 const adminPassword = formData.get("adminpasscode");

 if (!adminPassword) {
  return { message: "Member passcode is required." };
 }

 if (adminPassword !== ADMIN_PASSCODE) {
  return {
   message:
    "Wrong Passcode. Check around for hints and try again.\n Check out https://github.com/Rioba-Ian/members-only",
  };
 }

 try {
  const res = await db
   .update(users)
   .set({ role: "admin" })
   .where(eq(users.id, userDetails.id));
  revalidatePath("/");
 } catch (err) {
  return { message: "Database error: Failed to update membership to admin." };
 }
 redirect("/");
}
