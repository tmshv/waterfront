const fm = require('front-matter')

function createMeta(values) {
    const kv = []
    for (const [key, value] of Object.entries(values)) {
        const v = JSON.stringify(value)
        kv.push(`${key}={${v}}`)
    }

    return `<Meta ${kv.join(' ')} />`
}

module.exports = async function (content) {
    const callback = this.async()

    const output = fm(content)
    const attributes = []
    // for (const [key, value] of Object.entries(output.attributes)) {
    //     attributes.push(`export const ${key} = ${JSON.stringify(value)}`)
    // }

    const meta = createMeta(output.attributes)
    const results = `${meta}\n\n${output.body}\n`

    // const results = `${output.body}\n\n${attributes.join('\n\n')}\n`

    return callback(null, results)
}
