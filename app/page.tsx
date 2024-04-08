import Image from "next/image";
import {
 RegisterLink,
 LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
 const { getUser } = getKindeServerSession();
 const user = await getUser();

 console.log(user);

 return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
   <LoginLink>Sign in</LoginLink>
   <RegisterLink>Register</RegisterLink>
  </main>
 );
}
