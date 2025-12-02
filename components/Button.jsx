import React from "react";

function Button({
  children,
  type = "button",
  className,
  onClick,
  loading = false,
  ...props
}) {
  const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center">
        <div
          className="h-6 w-6 animate-spin rounded-full border-3 border-white border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || props.disabled}
      className={`bg-primary shadow-primary/20 w-full transform cursor-pointer rounded-full py-3.5 text-sm font-medium text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 ${className}`}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
}

export default Button;
