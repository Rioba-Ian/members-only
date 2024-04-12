import Image from "next/image";
import {
 RegisterLink,
 LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";

export default async function Home() {
 const { getUser } = getKindeServerSession();

 const posts = await db.query.posts.findMany({
  with: {
   user: true,
  },
 });

 console.log(posts);

 return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
   {posts.map((post) => (
    <PostCard key={post.id} post={post} />
   ))}
  </main>
 );
}
