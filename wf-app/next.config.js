const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/
})

module.exports = withMDX({
    pageExtensions: ['tsx', 'md', 'mdx'],
    webpack(config) {
        config.resolve.modules.push(__dirname)
        return config;
    },
})
