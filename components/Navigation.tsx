import React from "react";
import {
 RegisterLink,
 LoginLink,
 LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserMenuButton from "./UserMenuButton";

export default async function Navigation() {
 const { isAuthenticated, getUser } = getKindeServerSession();

 const user = await getUser();

 console.log(user);

 return (
  <nav className="container mx-auto flex justify-between py-3">
   <h1 className="text-3xl md:text-5xl font-bold  md:font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
    Members Only Club
   </h1>
   <div>
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
     <div className="flex items-center">
      <pre className="mt-4 bg-slate-950 text-cyan-200 p-4 font-mono text-sm rounded-sm">
       {user && user.family_name}
      </pre>
      <LogoutLink className="bg-accent gap-1.5 rounded-lg px-5 py-2  transition hover:bg-warning  focus:outline-none focus:ring">
       Sign out
      </LogoutLink>
      <UserMenuButton />
     </div>
    )}
   </div>
  </nav>
 );
}
