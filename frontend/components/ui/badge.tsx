import * as React from "react";

import { cn } from "@/lib/utils";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Badge({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}

