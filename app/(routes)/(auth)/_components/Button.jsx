import React from "react";

function Button({
  children,
  type = "button",
  className,
  onClick,
  loading = false,
}) {
  const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center">
        <div
          className="h-6 w-6 animate-spin rounded-full border-3 border-black border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary shadow-primary/20 w-full transform cursor-pointer rounded-xl py-3.5 text-sm font-bold text-black shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95 ${className}`}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
}

export default Button;
