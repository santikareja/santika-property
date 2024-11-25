/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pixabay.com'
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
}

module.exports = nextConfig;