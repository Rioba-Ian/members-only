import { Post } from "@/types";
import React from "react";

type PostCardProps = {
 post: Post;
};

export default function PostCard({ post }: PostCardProps) {
 return (
  <div className="card w-96 bg-base-100 shadow-xl">
   <div className="card-body">
    <div>
     <h2 className="card-title">{post.title}</h2>
     <span>
      by <strong>{post.user?.firstName}</strong>
     </span>
     <span className="ml-2">{post.createdAt?.toLocaleString()}</span>
    </div>
    <p>{post.body}</p>
    <div className="card-actions justify-end">
     <button className="btn btn-primary">Delete</button>
    </div>
   </div>
  </div>
 );
}

/*
<div key={post.id}>
     <div id="top-card">
      <h1>{post.title}</h1>{" "}
      <span>
       by <strong>{post.user?.firstName}</strong>
      </span>
      <span>Date Time</span>
     </div>
     <p>{post.body}</p>
    </div>
*/
