const withMDX = require('./next-mdx-plugin')({
    extension: /\.mdx?$/
})

module.exports = withMDX({
    pageExtensions: ['tsx', 'md', 'mdx'],
})
