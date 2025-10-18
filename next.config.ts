import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 设置跨域
  allowedDevOrigins: ["http://localhost:19111", "https://sm-web.soolay.cn"],
};

export default nextConfig;
