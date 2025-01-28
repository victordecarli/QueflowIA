/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
        },
        {
          protocol: "https",
          hostname: "replicate.com",
        },
        {
          protocol: "https",
          hostname: "replicate.delivery",
        },
      ],
},
  async headers() {
    return [
      {
        source: "/app/:path*", 
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },
    ];
  },
};

export default nextConfig;
