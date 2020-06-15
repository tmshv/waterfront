const withMDX = require('./next-mdx-plugin')({
    extension: /\.mdx?$/
})

module.exports = withMDX({
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
})
