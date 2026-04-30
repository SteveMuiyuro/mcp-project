import * as React from "react";

import { cn } from "@/lib/utils";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-md border border-input bg-white px-3 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary",
        className,
      )}
      {...props}
    />
  );
}

