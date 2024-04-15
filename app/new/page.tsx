import React from "react";

import CreateNewPost from "@/components/CreateNewPost";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function NewPost() {
 const { getUser } = getKindeServerSession();
 return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <CreateNewPost />
  </main>
 );
}
