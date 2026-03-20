/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },        // Spotify album art
      { protocol: 'https', hostname: 'mosaic.scdn.co' },
      { protocol: 'https', hostname: '*.spotifycdn.com' },
    ],
  },
  // Enable React strict mode for better DX
  reactStrictMode: true,
}

module.exports = nextConfig
