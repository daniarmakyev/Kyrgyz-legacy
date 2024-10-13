/** @type {import('next').NextConfig} */
const { i18n } = import('./next-i18next.config.js'); 

const nextConfig = {
    reactStrictMode: false,
    i18n,
};

export default nextConfig;