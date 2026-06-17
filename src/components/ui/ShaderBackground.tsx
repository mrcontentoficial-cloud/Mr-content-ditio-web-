"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo de shader WebGL: gradiente fluido morado animado.
 * GLSL robusto (solo sin/mix/smoothstep) para garantizar compilación.
 * Valida compile/link y registra errores en consola.
 */
const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv - 0.5;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.35;

  // capas de ondas + domain warp para un flujo orgánico
  float v = 0.0;
  v += sin(p.x * 3.0 + t);
  v += sin(p.y * 3.2 + t * 1.3);
  v += sin((p.x * 0.8 + p.y * 1.3) * 2.6 + t * 0.7);
  v += sin(length(p * 1.4) * 5.0 - t * 1.1);
  float w = sin(p.x * 2.0 + v + t * 0.5) + cos(p.y * 2.2 - v + t * 0.4);
  v += w * 0.6;
  float m = 0.5 + 0.5 * (v / 4.8);

  vec3 black  = vec3(0.02, 0.01, 0.06);
  vec3 deep   = vec3(0.27, 0.16, 0.52);
  vec3 accent = vec3(0.61, 0.50, 0.83);
  vec3 mag    = vec3(0.78, 0.49, 1.00);

  vec3 col = mix(black, deep, smoothstep(0.05, 0.5, m));
  col = mix(col, accent, smoothstep(0.42, 0.82, m));
  col = mix(col, mag, smoothstep(0.78, 1.0, m));

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      preserveDrawingBuffer: true,
    }) ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;

    if (!gl) {
      canvas.style.background =
        "radial-gradient(ellipse at 50% 30%, #3a2470 0%, #140c28 55%, #050308 100%)";
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.background =
        "radial-gradient(ellipse at 50% 30%, #3a2470 0%, #140c28 55%, #050308 100%)";
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      canvas.style.background =
        "radial-gradient(ellipse at 50% 30%, #3a2470 0%, #140c28 55%, #050308 100%)";
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.max(1, Math.floor((canvas.clientWidth || window.innerWidth) * dpr));
      const h = Math.max(1, Math.floor((canvas.clientHeight || window.innerHeight) * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    let visible = true;

    const draw = (timeSec: number) => {
      resize();
      gl.uniform1f(uTime, timeSec);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw((now - start) / 1000);
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Primer dibujo síncrono: garantiza un frame con color aunque rAF tarde.
    draw(0);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block h-full w-full ${className}`} />;
}
