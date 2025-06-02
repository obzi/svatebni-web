import { cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2 bg-blue-600 text-white hover:bg-blue-700");

export function Button({ className = "", ...props }) {
  return <button className={buttonVariants({ className })} {...props} />;
}
