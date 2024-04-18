"use client";
import React from "react";
import { Lock } from "lucide-react";
import { useFormState } from "react-dom";
import { upgradeToAdmin } from "../actions";

export default function BecomeAdmin() {
 const [adminFormState, adminFormAction] = useFormState(upgradeToAdmin, {
  message: "",
 });
 return (
  <main className="flex min-h-screen flex-col items-center justify-start md:justify-center gap-8 p-10 md:p-16">
   <section className="space-y-4">
    <h2 className="text-2xl md:text-3xl font-medium py-4 text-indigo-500">
     Become an Admin <Lock className="inline-block" />
    </h2>
    <p className="w-3/4">
     Enter the correct passcode to gain access to ultimate admin rights.
    </p>

    <br />

    <p>This time there are no hints.</p>

    <form action={adminFormAction}>
     <fieldset className="space-y-4">
      <input
       type="text"
       name="adminpasscode"
       placeholder="Admin passcode 🔐"
       required
       className="input input-bordered w-full rounded-xl max-w-xs md:max-w-md focus:border-purple-500"
      />

      {adminFormState.message && (
       <span className="block font-light text-red-300 transition-colors">
        {adminFormState.message}
       </span>
      )}

      <button
       type="submit"
       className="block mx-auto  btn btn-primary bg-indigo-500 rounded-xl hover:bg-purple-500 "
      >
       Continue
      </button>
     </fieldset>
    </form>
   </section>
  </main>
 );
}
