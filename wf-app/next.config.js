module.exports = () => {
    return {
        webpack(config) {
            config.resolve.modules.push(__dirname)
            return config;
        },
    }
}