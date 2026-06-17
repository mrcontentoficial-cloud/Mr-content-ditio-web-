"use client";

import { Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function DitheringBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Suspense fallback={null}>
        <Dithering
          colorBack="#00000000"
          colorFront="#9b7fd4"
          shape="warp"
          type="4x4"
          speed={0.3}
          className="size-full"
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
}
