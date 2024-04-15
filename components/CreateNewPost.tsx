"use client";
import createPost, { ErrorState } from "@/app/actions";
import React from "react";
import { SubmitButton } from "./helpers/SubmitButton";
import { useFormState } from "react-dom";

const initialState: ErrorState = {
 message: "",
 error: null,
};

export default function CreateNewPost() {
 const [state, formAction] = useFormState(createPost, initialState);

 return (
  <form action={formAction}>
   <fieldset className="space-y-8">
    <p>
     Write <span className="text-primary font-semibold">whatever</span> is on
     your mind...
    </p>

    <input
     type="text"
     placeholder="Type here"
     name="title"
     min={2}
     required
     className="input input-bordered w-full rounded-xl max-w-xs"
    />

    <textarea
     name="content"
     className="textarea textarea-bordered rounded-xl w-full"
     rows={10}
     required
     minLength={2}
     maxLength={256}
     placeholder="Content"
    ></textarea>
    {state?.message && (
     <p aria-live="polite" className="sr-only">
      {state.message}
     </p>
    )}

    {state?.error && (
     <div className="alert alert-error">
      <div className="flex-1">
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
         d="M6 18L18 6M6 6l12 12"
        />
       </svg>
      </div>
      <div className="flex-1">
       <p className="font-bold">{state.error.title}</p>
       <p>{state.error.message}</p>
      </div>
     </div>
    )}

    <SubmitButton />
   </fieldset>
  </form>
 );
}
