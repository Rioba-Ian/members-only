import { Post, User } from "@/types";
import React from "react";

type PostCardProps = {
 post: Post;
 loggedUserDetails: User | null;
};

const options: Intl.DateTimeFormatOptions = {
 year: "numeric",
 month: "long",
 day: "numeric",
 weekday: "long",
};

export default function PostCard({ post, loggedUserDetails }: PostCardProps) {
 return (
  <div className="card w-72 md:w-96 bg-base-100 shadow-xl">
   <div className="card-body">
    <div>
     <h2 className="card-title">{post.title}</h2>
     <span>
      by <strong>{post.user?.firstName}</strong>
     </span>
     <span className="ml-2">
      {loggedUserDetails?.id &&
       post.createdAt?.toLocaleString("en-US", options)}
     </span>
    </div>
    <p>{post.body}</p>
    <div className="card-actions justify-end">
     <button className="btn btn-primary">Delete</button>
    </div>
   </div>
  </div>
 );
}
