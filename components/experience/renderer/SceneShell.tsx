"use client";

import type { ReactNode } from "react";

interface SceneShellProps {
  children: ReactNode;
  contentClassName?: string;
}

export function SceneShell({
  children,
  contentClassName = "",
}: SceneShellProps) {
  return (
    <div className="flex h-full w-full items-center justify-center px-6 py-10">
      <div className={`w-full max-w-[22rem] ${contentClassName}`.trim()}>{children}</div>
    </div>
  );
}
