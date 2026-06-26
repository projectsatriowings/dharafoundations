import React from "react";

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "transparent";
  onClick?: () => void;
  cursorLabel?: string;
}

export function ModernCard({
  children,
  className = "",
  variant = "light",
  onClick,
  cursorLabel,
}: ModernCardProps) {
  const baseClasses =
    "modern-card group relative rounded-[24px] transition-all duration-300 ease-out overflow-hidden";

  const variantClasses = {
    light:
      "bg-surface-container-lowest text-on-surface shadow-[0_10px_40px_-10px_rgba(36,105,92,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(36,105,92,0.08)] hover:-translate-y-2 border border-outline-variant/15",
    dark:
      "bg-secondary text-on-secondary shadow-lg hover:shadow-[0_0_30px_rgba(36,105,92,0.3)] hover:-translate-y-2 border border-secondary-container/20",
    transparent:
      "bg-transparent hover:-translate-y-1",
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-cursor-label={cursorLabel}
    >
      {children}
    </div>
  );
}

export function CardImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className="w-full overflow-hidden relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${className}`}
        loading="lazy"
      />
    </div>
  );
}
