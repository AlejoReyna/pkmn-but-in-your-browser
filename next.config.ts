import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackMemoryOptimizations: true,
    cpus: 1,
  },
  webpack(config, { dev }) {
    if (dev) {
      // Trade compilation speed for lower peak memory on the 8 GB local Mac.
      config.parallelism = 2;
      if (config.cache && typeof config.cache === "object" && config.cache.type === "filesystem") {
        config.cache.maxMemoryGenerations = 0;
      }
    }
    return config;
  },
};

export default nextConfig;
