// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/reactCompiler
    reactCompiler: true,
  },
  // NOTE: `redirects` don't work with `output: 'export'`
  // Docs: https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirects-in-nextconfigjs
  // Docs: https://nextjs.org/docs/app/api-reference/next-config-js/redirects

  // Deploy to Github Pages
  // Docs: https://github.com/gregrickaby/nextjs-github-pages?tab=readme-ov-file#nextjs-config
  output: 'export',
  images: { unoptimized: true },
}

export default nextConfig
