import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rawBasePath = process.env.PAGES_BASE_PATH?.trim() ?? ""
const shouldExport = process.env.NEXT_OUTPUT_MODE === "export"
const basePath =
  rawBasePath && rawBasePath !== "/"
    ? rawBasePath.startsWith("/")
      ? rawBasePath.replace(/\/+$/, "")
      : `/${rawBasePath.replace(/\/+$/, "")}`
    : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  ...(shouldExport
    ? {
        output: "export",
      }
    : {}),
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
}

export default nextConfig
