const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
    i18n: {
        locales: ['ru', 'en'],
        defaultLocale: 'ru',
    },
    future: {
        webpack5: true,
    }
})
