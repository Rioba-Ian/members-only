"use client";
import React from "react";

type UserFromKindeProps = {};
export default function UserMenuButton({}: UserFromKindeProps) {
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
    className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-5 bg-base-100 p-2 shadow"
   >
    <li>
     <a>Profile</a>
    </li>
   </ul>
  </div>
 );
}
