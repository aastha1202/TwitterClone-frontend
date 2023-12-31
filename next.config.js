/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
    // images: {
    //   remotePatterns:[
    //     {
    //       hostname:'res.cloudinary.com',
    //     }
    //   ]
    // },
    // hostname:['lh3.googleusercontent.com']
}

module.exports = nextConfig