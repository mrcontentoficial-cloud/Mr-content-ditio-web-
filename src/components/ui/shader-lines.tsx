"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    THREE: unknown;
  }
}

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    camera: unknown;
    scene: unknown;
    renderer: { dispose: () => void; setSize: (w: number, h: number) => void; domElement: HTMLCanvasElement; render: (s: unknown, c: unknown) => void } | null;
    uniforms: { time: { value: number }; resolution: { value: { x: number; y: number } } } | null;
    animationId: number | null;
  }>({
    camera: null,
    scene: null,
    renderer: null,
    uniforms: null,
    animationId: null,
  });

  useEffect(() => {
    const existing = document.getElementById("threejs-r89") as HTMLScriptElement | null;

    const init = () => {
      if (containerRef.current && (window as { THREE?: unknown }).THREE) {
        initThreeJS();
      }
    };

    let script = existing;
    if (!script) {
      script = document.createElement("script");
      script.id = "threejs-r89";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/89/three.min.js";
      script.onload = init;
      document.head.appendChild(script);
    } else if ((window as { THREE?: unknown }).THREE) {
      init();
    } else {
      script.addEventListener("load", init);
    }

    return () => {
      if (sceneRef.current.animationId) cancelAnimationFrame(sceneRef.current.animationId);
      if (sceneRef.current.renderer) sceneRef.current.renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const THREE = (window as any).THREE;
    if (!THREE) return;
    const container = containerRef.current;
    container.innerHTML = "";

    const camera = new THREE.Camera();
    camera.position.z = 1;
    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    const uniforms = {
      time: { type: "f", value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    };

    const vertexShader = `
      void main() { gl_Position = vec4( position, 1.0 ); }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      float random (in float x) { return fract(sin(x)*1e4); }
      float random (vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233)))*43758.5453123); }
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);
        float t = time*0.06+random(uv.x)*0.4;
        float lineWidth = 0.0008;
        float v = 0.0;
        for(int j = 0; j < 3; j++){
          for(int i=0; i < 5; i++){
            v += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv));
          }
        }
        // Tinte morado de marca
        vec3 purple = vec3(0.61, 0.45, 0.85);
        gl_FragColor = vec4(purple * v, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: null };

    const onResize = () => {
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };
    onResize();
    window.addEventListener("resize", onResize, false);

    const animate = () => {
      sceneRef.current.animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };
    animate();
  };

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}
