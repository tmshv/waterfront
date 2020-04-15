const withMDX = require('./next-mdx-plugin')({
    extension: /\.mdx?$/
})

module.exports = withMDX({
    pageExtensions: ['tsx', 'md', 'mdx'],
    webpack(config) {
        config.resolve.modules.push(__dirname)
        return config;
    },
})
