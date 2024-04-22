import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { getAuthenticatedUser } from "@/utils/user";
import { asc, desc } from "drizzle-orm";

export default async function Home() {
 const userDetails = await getAuthenticatedUser();

 const posts = await db.query.posts.findMany({
  with: {
   user: true,
  },
  orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
 });

 return (
  <main className="flex min-h-screen flex-col items-center justify-between gap-8 p-24">
   {posts.map((post) => (
    <PostCard key={post.id} post={post} loggedUserDetails={userDetails} />
   ))}
  </main>
 );
}
