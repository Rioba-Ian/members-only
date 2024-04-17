"use client";
import { User } from "@/types";
import {} from "next";
import Link from "next/link";
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
    className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 md:w-56 bg-base-100 p-2 shadow divider-y divider-info"
   >
    <li>
     <p className="font-light">Signed in as</p>
     <p className="whitespace-break-spaces font-bold text-ellipsis overflow-hidden max-w-full">
      {" "}
      {user.email.slice(0, 20)}
      {user.email.length > 20 && "..."}{" "}
      {/* Optional: Show some additional characters after truncation (adjust limit as needed) */}
      {user.email.length > 20 && user.email.slice(20, 25)}
     </p>
    </li>

    <li>
     <p className="font-light">
      Membership Status:{" "}
      <span className=" text-xs badge badge-info font-bold">{user.role}</span>
     </p>
    </li>

    <li>
     {(user.role === "user" || user.role === "admin") && (
      <Link
       href={"/become-member"}
       className="btn btn-primary my-2"
       //    onClick={() => redirect("/become-member")}
      >
       Become Member
      </Link>
     )}
     {user.role === "member" && (
      <Link className="btn btn-primary my-2" href={"/become-admin"}>
       Become Admin
      </Link>
     )}
    </li>
   </ul>
  </div>
 );
}
