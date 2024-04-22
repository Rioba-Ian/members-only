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
import { SquarePen, Lock, Flame } from "lucide-react";

export default async function Navigation() {
 const { isAuthenticated, getUser } = getKindeServerSession();

 const user = await getUser();
 const userDetails = await db.query.users.findFirst({
  where: (users, { eq }) => eq(users.kindeId, user?.id || ""),
 });

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
     <div className="flex items-center justify-start gap-4">
      {userDetails && (
       <div className="hidden md:flex items-center gap-12">
        <Link href="/new" className="flex items-start gap-2">
         <p>New Post</p> <SquarePen className="text-4xl text-slate-200" />
        </Link>

        {userDetails.role === "user" && (
         <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
           <Link href={"/become-member"}>
            Member <Flame className="inline-block" />
           </Link>
          </span>
         </button>
        )}

        {userDetails.role === "member" && (
         <Link href={"/become-admin"}>
          Admin{" "}
          <Lock className="inline-block text-purple-500 hover:text-white" />
         </Link>
        )}
       </div>
      )}
      <LogoutLink className="bg-[#c86300] gap-1.5 text-sm md:text-base rounded-lg px-5 py-2  transition hover:bg-[#dd8400]  focus:outline-none focus:ring">
       Sign out
      </LogoutLink>
      {userDetails ? <UserMenuButton user={userDetails} /> : null}
     </div>
    )}
   </div>
  </nav>
 );
}
