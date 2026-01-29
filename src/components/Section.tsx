import * as React from "react";

export function Section({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-6">
        {title && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-sm text-white/65">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}