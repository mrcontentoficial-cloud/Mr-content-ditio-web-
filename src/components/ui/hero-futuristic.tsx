"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useAspect, useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three/webgpu";
import { bloom } from "three/examples/jsm/tsl/display/BloomNode.js";
import { Mesh } from "three";
import {
  abs,
  blendScreen,
  float,
  mod,
  mx_cell_noise_float,
  oneMinus,
  smoothstep,
  texture,
  uniform,
  uv,
  vec2,
  vec3,
  pass,
  mix,
  add,
} from "three/tsl";

import { waLink } from "@/lib/site";
import MagneticButton from "./MagneticButton";

const TEXTUREMAP = { src: "https://i.postimg.cc/XYwvXN8D/img-4.png" };
const DEPTHMAP = { src: "https://i.postimg.cc/2SHKQh2q/raw-4.webp" };

extend(THREE as never);

const PostProcessing = ({
  strength = 1,
  threshold = 1,
  fullScreenEffect = true,
}: {
  strength?: number;
  threshold?: number;
  fullScreenEffect?: boolean;
}) => {
  const { gl, scene, camera } = useThree();
  const progressRef = useRef({ value: 0 });

  const render = useMemo(() => {
    const postProcessing = new THREE.PostProcessing(gl as never);
    const scenePass = pass(scene, camera);
    const scenePassColor = scenePass.getTextureNode("output");
    const bloomPass = bloom(scenePassColor, strength, 0.5, threshold);

    const uScanProgress = uniform(0);
    progressRef.current = uScanProgress;

    const scanPos = float(uScanProgress.value);
    const uvY = uv().y;
    const scanWidth = float(0.05);
    const scanLine = smoothstep(0, scanWidth, abs(uvY.sub(scanPos)));
    const purpleOverlay = vec3(0.61, 0.5, 0.83).mul(oneMinus(scanLine)).mul(0.5);

    const withScanEffect = mix(
      scenePassColor,
      add(scenePassColor, purpleOverlay),
      fullScreenEffect ? smoothstep(0.9, 1.0, oneMinus(scanLine)) : 1.0
    );

    const final = withScanEffect.add(bloomPass);
    postProcessing.outputNode = final;
    return postProcessing;
  }, [camera, gl, scene, strength, threshold, fullScreenEffect]);

  useFrame(({ clock }) => {
    progressRef.current.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    render.renderAsync();
  }, 1);

  return null;
};

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const [rawMap, depthMap] = useTexture([TEXTUREMAP.src, DEPTHMAP.src]);

  const meshRef = useRef<Mesh>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rawMap && depthMap) setVisible(true);
  }, [rawMap, depthMap]);

  const { material, uniforms } = useMemo(() => {
    const uPointer = uniform(new THREE.Vector2(0));
    const uProgress = uniform(0);

    const strength = 0.01;
    const tDepthMap = texture(depthMap);
    const tMap = texture(rawMap, uv().add(tDepthMap.r.mul(uPointer).mul(strength)));

    const aspect = float(WIDTH).div(HEIGHT);
    const tUv = vec2(uv().x.mul(aspect), uv().y);

    const tiling = vec2(120.0);
    const tiledUv = mod(tUv.mul(tiling), 2.0).sub(1.0);
    const brightness = mx_cell_noise_float(tUv.mul(tiling).div(2));

    const dist = float(tiledUv.length());
    const dot = float(smoothstep(0.5, 0.49, dist)).mul(brightness);

    const depth = tDepthMap.r;
    const flow = oneMinus(smoothstep(0, 0.02, abs(depth.sub(uProgress))));

    const mask = dot.mul(flow).mul(vec3(6, 4, 11));
    const final = blendScreen(tMap, mask);

    const material = new THREE.MeshBasicNodeMaterial({
      colorNode: final,
      transparent: true,
      opacity: 0,
    });

    return { material, uniforms: { uPointer, uProgress } };
  }, [rawMap, depthMap]);

  const [w, h] = useAspect(WIDTH, HEIGHT);

  useFrame(({ clock }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    if (meshRef.current && meshRef.current.material) {
      const mat = meshRef.current.material as { opacity?: number };
      if ("opacity" in mat && typeof mat.opacity === "number") {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, visible ? 1 : 0, 0.07);
      }
    }
  });

  useFrame(({ pointer }) => {
    uniforms.uPointer.value = pointer;
  });

  // Escala que cubre toda la pantalla (antes 0.4 dejaba un cuadrado al centro)
  const scaleFactor = 1.3;
  return (
    <mesh
      ref={meshRef}
      scale={[w * scaleFactor, h * scaleFactor, 1]}
      material={material}
    >
      <planeGeometry />
    </mesh>
  );
};

const rotating = [
  "VENDA.",
  "CONVIERTA.",
  "DESTAQUE.",
  "FACTURE.",
  "CREZCA.",
  "ENAMORE.",
  "DOMINE.",
];

export default function HeroFuturistic() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % rotating.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-svh w-full bg-night">
      {/* Velo para legibilidad del texto (oscurece el centro, deja ver las luces en los bordes) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_55%_50%_at_center,rgba(0,0,0,0.65),rgba(0,0,0,0.2)_60%,transparent)]"
      />

      {/* Texto encima */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.3 }}
        className="pointer-events-none absolute inset-0 z-20 flex w-full flex-col items-center justify-center px-6 text-center"
      >
        <span className="mb-7 text-sm font-bold uppercase tracking-[0.22em] text-accent-bright">
          Agencia creativa
        </span>

        <h1 className="font-display font-black tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
          <span className="font-coolvetica mb-3 block text-4xl font-bold tracking-[0.06em] text-white md:text-6xl">
            Hacemos que tu negocio
          </span>
          <span className="relative block text-6xl leading-[0.9] md:text-8xl">
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -28, opacity: 0, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
                className="inline-block uppercase text-gradient"
              >
                {rotating[idx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-xl">
          Estrategia, contenido y tecnología que hacen que tu negocio venda.
        </p>

        <div className="pointer-events-auto mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <MagneticButton href={waLink()} className="px-10 py-5 text-lg">
            Hablemos por WhatsApp
          </MagneticButton>
          <MagneticButton
            href="#servicios"
            variant="ghost"
            external={false}
            className="px-10 py-5 text-lg"
          >
            Ver lo que hacemos
          </MagneticButton>
        </div>
      </motion.div>

      {/* indicador de scroll */}
      <a
        href="#propuesta"
        aria-label="Bajar"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/90 transition-colors hover:text-accent"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce"
        >
          <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </a>

      {/* Canvas WebGPU */}
      <Canvas
        flat
        dpr={[1, 2]}
        className="absolute inset-0 z-0"
        gl={async (props) => {
          const renderer = new THREE.WebGPURenderer(props as never);
          await renderer.init();
          return renderer;
        }}
      >
        <PostProcessing fullScreenEffect />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
