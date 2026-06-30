import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/cotizador", destination: "/cotizador.html" }];
  },
};

export default nextConfig;
