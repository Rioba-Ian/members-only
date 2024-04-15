"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
 const { pending } = useFormStatus();

 return (
  <button className="btn btn-primary rounded-xl" aria-disabled={pending}>
   {pending ? (
    <div className="flex items-center gap-4 ml-8">
     <span className="loading loading-spinner loading-md"></span>
     Submitting ...
    </div>
   ) : (
    "Submit"
   )}
  </button>
 );
}
