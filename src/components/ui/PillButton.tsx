import React from "react";
import Link from "next/link";

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  showArrow?: boolean;
}

export function PillButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  showArrow = false,
}: PillButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full transition-all duration-300 font-label-lg font-semibold tracking-wide select-none group cursor-pointer active:scale-97";

  const variantClasses = {
    primary:
      "px-8 py-4 bg-primary text-on-primary hover:opacity-90 hover:scale-105 hover:shadow-lg border border-transparent",
    secondary:
      "px-8 py-4 bg-transparent text-primary dark:text-saffron-glow border-2 border-primary dark:border-saffron-glow hover:bg-primary hover:text-on-primary dark:hover:bg-saffron-glow dark:hover:text-deep-forest hover:scale-105",
    ghost:
      "px-6 py-2.5 bg-saffron-glow/20 text-on-surface hover:bg-saffron-glow/40 hover:scale-105",
  };

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className="material-symbols-outlined ml-2 text-lg transition-transform duration-300 group-hover:translate-x-1.5">
          arrow_forward
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
    >
      {content}
    </button>
  );
}
