import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the file-tracing root to this project. A stray lockfile higher up the
  // directory tree can otherwise make Next infer the wrong workspace root.
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
