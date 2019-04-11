let config = null

async function json(url) {
    const res = await fetch(url)
    return res.json()
}

async function main() {
    const attribution = [
        '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>',
        '<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
    ].join('')

    // const center = [59.932924, 30.344087]
    const center = [30.344087, 59.932924]
    const zoom = 11
    const key = 'BANyZrASqDKOtn6kEAe9'
    const mapName = '495bac53-4c52-4e14-b9d1-3bd481a5be26'
    // const mapName = 'positron'

    config = await json('config.json')
    const features = await json('features.json')

    // const map = L.map('map').setView(center, zoom)
    // const gl = L.mapboxGL({
    //     attribution,
    //     accessToken: 'not-needed',
    //     style: `https://api.maptiler.com/maps/495bac53-4c52-4e14-b9d1-3bd481a5be26/style.json?key=${key}`
    // }).addTo(map)

    // L.marker(center)
    //     .addTo(map)
    //     .bindPopup('<strong>WF</strong>')
    //     .openPopup()

    const style = `https://api.maptiler.com/maps/${mapName}/style.json?key=${key}`

    // You can remove the following line if you don't need support for RTL (right-to-left) labels:
    mapboxgl.setRTLTextPlugin('https://cdn.maptiler.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.2/mapbox-gl-rtl-text.js');
    const map = new mapboxgl.Map({
        container: 'map',
        style,
        center,
        zoom,
    })

    map.on('click', event => {
        console.log('map click', event.lngLat)
    })

    // // create the popup
    // const popup = new mapboxgl.Popup({ offset: 25 })
    //     .setText('WF')

    // var popup = new mapboxgl.Popup({
    //     closeOnClick: false
    // })
    //     .setLngLat(center)
    //     .setHTML('<h1>WF</h1>')
    //     .addTo(map)

    const currentCity = 'saint-petersburg'

    for (const f of features) {
        if (f.city !== currentCity) {
            continue
        }

        const element = createMarkerElement(f)
        const options = {
        }

        if (element) {
            options.element = element
        }

        const marker = new mapboxgl.Marker(options)
        marker.setLngLat(f.location).addTo(map)
    }

// map.addControl(new mapboxgl.NavigationControl());
}

main()

// code for creating an SVG donut chart from feature properties
function createMarkerElement(feature) {
    const r = 25
    const w = r * 2
    const viewbox = [0, 0, w, w].join(' ')

    const options = {
        cx: r,
        cy: r,
    }

    const children = [
        renderAttribute('authorType', feature.attributes.authorType, {
            ...options,
            className: 'wf-marker',
        }),
        renderAttribute('placement', feature.attributes.placement, options),
        renderAttribute('type', feature.attributes.type, options),
    ]

    for (const c of children) {
        if (!c) {
            return null
        }
    }

    const svg = `<svg width="${w}" height="${w}" viewbox="${viewbox}">${children.join('')}</svg>`

    return htmlElementFromString(svg).firstChild
}

function renderAttribute(name, value, options) {
    const p = config.attributes[name]

    if (p.render !== 'circle') {
        return null
    }

    const pv = p.types[value]
    if (!pv) {
        return null
    }

    return svgCircle({
        ...options,
        ...pv,
    })
}

function svgCircle({ cx, cy, r, fill, opacity, className }) {
    return `<circle class="${className}" cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="${opacity}"/>`
}

function htmlElementFromString(html, container = 'div') {
    const element = document.createElement(container)
    element.innerHTML = html

    return element
}
