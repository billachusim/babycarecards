import { Baby } from "lucide-react";

import type { Child } from "../models";

export function ChildAvatar({ child, size = 56 }: { child: Child; size?: number }) {
  const style = { width: size, height: size };
  if (child.photoDataUrl) {
    return (
      <img
        src={child.photoDataUrl}
        alt={`Photo of ${child.name}`}
        style={style}
        className="shrink-0 rounded-2xl object-cover"
      />
    );
  }
  return (
    <div
      style={style}
      className="flex shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
      aria-hidden="true"
    >
      <Baby style={{ width: size * 0.42, height: size * 0.42 }} />
    </div>
  );
}
