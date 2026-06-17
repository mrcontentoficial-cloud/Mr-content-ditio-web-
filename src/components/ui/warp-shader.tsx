"use client";

import { Warp } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

export function WarpBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Warp
        style={{ height: "100%", width: "100%" }}
        proportion={0.45}
        softness={1}
        distortion={0.25}
        swirl={0.8}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={0}
        speed={0.8}
        colors={[
          "hsl(258, 45%, 6%)",
          "hsl(263, 55%, 52%)",
          "hsl(258, 52%, 66%)",
          "hsl(282, 70%, 78%)",
        ]}
      />
    </div>
  );
}
