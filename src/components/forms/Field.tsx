import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
};

export function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
  className,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn("space-y-2", className)}>
      <label
        htmlFor={id}
        className="block text-[0.95rem] font-medium text-text-primary"
      >
        {label}
        {required ? (
          <span className="text-accent" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="ml-1 text-sm font-normal text-text-muted">
            (optional)
          </span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-sm text-text-secondary">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClasses =
  "w-full rounded-[var(--radius-field)] border border-border-strong bg-surface-primary px-3.5 py-3 text-[1.0625rem] text-text-primary outline-none transition-colors duration-200 placeholder:text-text-muted focus-visible:border-accent";

export function TextInput({
  className,
  ...props
}: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(controlClasses, className)} {...props} />;
}

export function TextArea({
  className,
  ...props
}: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(controlClasses, "min-h-32 resize-y", className)}
      {...props}
    />
  );
}

export function SelectInput({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"select">) {
  return (
    <select className={cn(controlClasses, className)} {...props}>
      {children}
    </select>
  );
}

export function describedBy(hintId?: string, errorId?: string) {
  return [hintId, errorId].filter(Boolean).join(" ") || undefined;
}
