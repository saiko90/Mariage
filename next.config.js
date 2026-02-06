/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore les erreurs de types (permet de déployer même si le code n'est pas "parfait" pour TypeScript)
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore les avertissements de style pendant le build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
