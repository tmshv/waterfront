const withCss = require('@zeit/next-css')

module.exports = () => {
    return withCss({
        webpack(config) {
            config.resolve.modules.push(__dirname)
            return config;
        },
    })
}