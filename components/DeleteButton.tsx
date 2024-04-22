"use client";
import { Post, User } from "@/types";
import React, { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteComment } from "@/app/actions";

type DeleteCommentButtonProps = {
 post: Post;
 loggedUserDetails: User | null;
};

export default function DeleteButton({
 post,
 loggedUserDetails,
}: DeleteCommentButtonProps) {
 const [confirmDelete, setConfirmDelete] = useState(false);
 const [isPending, startTransition] = useTransition();

 const handleDelete = () => {
  if (!loggedUserDetails || loggedUserDetails.role !== "admin") {
   alert("Upgrade your status to admin to delete a post.");
   return;
  }

  setConfirmDelete(true);

  startTransition(() => {
   deleteComment(post.id);
   setTimeout(() => {
    setConfirmDelete(false);
   }, 3000);
  });
 };
 return (
  <>
   <button
    className="btn btn-primary"
    onClick={(e) => {
     setConfirmDelete(false);
     (document.getElementById(`${post.id}`) as HTMLFormElement).showModal();
     e.stopPropagation();
    }}
   >
    {confirmDelete ? (
     <span className="loading loading-spinner loading-sm"></span>
    ) : (
     <>
      <Trash2 />
      <span>Delete</span>
     </>
    )}
   </button>
   <dialog id={`${post.id}`} className="modal">
    <div className="modal-box">
     <h3 className="font-bold text-lg">Delete Comment</h3>
     <p className="py-4">
      Are you sure you want to delete this comment? This will remove the comment
      and cannot be undone.
     </p>
     <div className="flex items-center justify-between uppercase">
      <button
       className="btn btn-neutral uppercase"
       onClick={() =>
        (document.getElementById(`${post.id}`) as HTMLFormElement).close()
       }
      >
       No, Cancel
      </button>
      <button
       className="btn bg-soft-red text-white uppercase"
       onClick={(e) => {
        handleDelete();
        (document.getElementById(`${post.id}`) as HTMLFormElement).close();
        e.stopPropagation();
       }}
      >
       {confirmDelete ? (
        <span className="loading loading-spinner loading-sm"></span>
       ) : (
        "Delete"
       )}
      </button>
     </div>
    </div>
    <form method="dialog" className="modal-backdrop">
     <button>close</button>
    </form>
   </dialog>
  </>
 );
}
