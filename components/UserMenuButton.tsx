"use client";
import { User } from "@/types";
import React from "react";

type UserFromKindeProps = {
 user: User;
};
export default function UserMenuButton({ user }: UserFromKindeProps) {
 return (
  <div className="dropdown-end dropdown">
   <label tabIndex={0} className="btn-ghost btn-circle btn">
    {
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M19 9l-7 7-7-7"
      />
     </svg>
    }
   </label>
   <ul
    tabIndex={0}
    className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow divider-y divider-info"
   >
    <li>
     <p className="font-light">Signed in as</p>
     <strong>{user.email}</strong>
    </li>

    <li>
     <p className="font-light">Membership Status</p>
     <span className="font-bold">{user.role}</span>
    </li>

    <li>
     <button className="btn-primary">Become Member</button>
    </li>
   </ul>
  </div>
 );
}
