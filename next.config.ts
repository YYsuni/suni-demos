import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
	reactStrictMode: false,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	experimental: {
		scrollRestoration: false
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
		},

		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', 'css', '.glb', '.gltf']
	},
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: [{ loader: '@svgr/webpack', options: { svgo: false } }]
		})

		config.module.rules.push({
			test: /\.(glb|gltf)$/i,
			type: 'asset/resource'
		})

		return config
	}
};

export default nextConfig;
