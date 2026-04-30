import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-[1.25rem] border border-input bg-white/95 px-4 py-3 text-sm outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-rose-200/70",
        className,
      )}
      {...props}
    />
  );
}
