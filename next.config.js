const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
const withMDX = require('./next-mdx-plugin')({
    extension: /\.mdx?$/
})

module.exports = withBundleAnalyzer(withMDX({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    i18n: {
        locales: ['ru', 'en'],
        defaultLocale: 'ru',
    },
}))
