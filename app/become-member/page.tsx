"use client";
import { MEMBER_PASSCODE } from "@/utils/constants";
import React from "react";
import { useFormState } from "react-dom";
import { upgradeToMember } from "../actions";

export default function BecomeMember() {
 console.log("password", MEMBER_PASSCODE);

 const [memberState, updateMemberShipAction] = useFormState(upgradeToMember, {
  message: "",
 });

 console.log(memberState);

 return (
  <main className="flex min-h-screen flex-col items-center justify-start md:justify-center gap-8 p-10 md:p-16">
   <section className="space-y-4">
    <h2 className="text-2xl md:text-3xl font-medium py-4 text-pink-500">
     Become a member
    </h2>
    <p className="w-3/4">
     Enter the correct passcode to gain access to member status
    </p>

    <form action={updateMemberShipAction}>
     <fieldset className="space-y-4">
      <input
       type="text"
       name="memberpasscode"
       placeholder="Member passcode"
       required
       className="input input-bordered w-full rounded-xl max-w-xs md:max-w-md focus:border-purple-500"
      />

      {memberState.message && (
       <span className="block font-light text-red-300 transition-colors">
        {memberState.message}
       </span>
      )}

      <button
       type="submit"
       className="block mx-auto  btn btn-primary rounded-xl hover:bg-pink-500 "
      >
       Continue
      </button>
     </fieldset>
    </form>
   </section>
  </main>
 );
}
