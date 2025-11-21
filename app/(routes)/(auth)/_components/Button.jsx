import React from "react";

function Button({ children, type = "button", className, onClick }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary shadow-primary/20 w-full transform cursor-pointer rounded-xl py-3.5 text-sm font-bold text-black shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
