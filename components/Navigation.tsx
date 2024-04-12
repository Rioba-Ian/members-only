import React from "react";
import {
 RegisterLink,
 LoginLink,
 LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserMenuButton from "./UserMenuButton";
import Link from "next/link";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/lib/db/schema";

export default async function Navigation() {
 const { isAuthenticated, getUser } = getKindeServerSession();

 const user = await getUser();
 const userDetails = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.kindeId, user?.id || ""),
 });
 console.log(user);

 console.log(userDetails);

 return (
  <nav className="container w-full mx-auto flex flex-col md:flex-row justify-between py-3">
   <Link
    href="/"
    className="text-xl md:text-3xl font-bold  md:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
   >
    Members Only Club
   </Link>
   <div className="ml-auto">
    {!(await isAuthenticated()) ? (
     <div className="space-x-4">
      <LoginLink className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-1 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring">
       Sign in
      </LoginLink>
      <RegisterLink className="bg-primary gap-1.5 rounded-lg px-5 py-2  transition hover:bg-secondary  focus:outline-none focus:ring">
       Sign up
      </RegisterLink>
     </div>
    ) : (
     <div className="flex items-center justify-start">
      <LogoutLink className="bg-accent gap-1.5 text-sm md:text-base rounded-lg px-5 py-2  transition hover:bg-warning  focus:outline-none focus:ring">
       Sign out
      </LogoutLink>
      {userDetails ? <UserMenuButton user={userDetails} /> : null}
     </div>
    )}
   </div>
  </nav>
 );
}
