import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dhara Foundations',
    short_name: 'Dhara Foundations',
    description: 'A non-profit organization dedicated to cultural revival, compassionate service, and spiritual awareness across Tamil Nadu.',
    start_url: '/',
    display: 'standalone',
    background_color: '#00322B',
    theme_color: '#00322B',
    orientation: 'any',
    icons: [
      {
        src: '/logo-icon-only.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-icon-only.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/logo-icon-only.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
