import { MeshGradient } from "@paper-design/shaders-react";
import React, { useEffect, useState } from "react";

type MeshSphereProps = {
  size?: number; // px
  colors?: string[];
  className?: string;
};

export default function MeshSphere({
  size = 160,
  colors = ["#ffffff", "#87dede", "#ffc099", "#815d90"],
  className = "",
}: MeshSphereProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Sphere base (clip circle) */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{
          boxShadow:
            "0 30px 70px rgba(0,0,0,.35), inset 0 10px 25px rgba(255,255,255,.10)",
        }}
      >
        <MeshGradient
          width={size}
          height={size}
          colors={colors}
          distortion={0.5}
          swirl={0.35}
          grainMixer={0}
          grainOverlay={0}
          speed={0.8}
        />

        {/* Soft blur to blend mesh like a “gel” sphere */}
        <div className="absolute inset-0 blur-xl opacity-60" />
      </div>

      {/* Specular highlight (top-left) */}
      <div
        className="pointer-events-none absolute rounded-full"
        style={{
          left: size * 0.12,
          top: size * 0.1,
          width: size * 0.42,
          height: size * 0.42,
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.25) 35%, rgba(255,255,255,0) 70%)",
          filter: "blur(1px)",
          opacity: 0.85,
        }}
      />

      {/* Rim light (edges) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(255,255,255,.25) 0%, rgba(255,255,255,0) 55%), radial-gradient(circle at 50% 60%, rgba(0,0,0,.25) 0%, rgba(0,0,0,0) 55%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Inner shadow for depth */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          boxShadow:
            "inset 0 -18px 30px rgba(0,0,0,.35), inset 0 10px 18px rgba(255,255,255,.10)",
        }}
      />

      {/* Drop shadow ellipse */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: -size * 0.18,
          width: size * 0.8,
          height: size * 0.22,
          background: "rgba(0,0,0,.35)",
          filter: "blur(18px)",
          borderRadius: "9999px",
          opacity: 0.45,
        }}
      />
    </div>
  );
}
