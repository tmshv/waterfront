const attribution = [
    '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a>',
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
].join('')

// const center = [59.932924, 30.344087]
const center = [30.344087, 59.932924]
const zoom = 11
const key = 'BANyZrASqDKOtn6kEAe9'

const palette = {
    attributes: {
        authorType: {
            render: 'circle',
            types: {
                artists: {
                    r: 20,
                    fill: '#AAB38C',
                    opacity: 0.5,
                },
                designers: {
                    r: 20,
                    fill: '#ACB7E9',
                    opacity: 0.75,
                },
            }
        },
        placement: {
            render: 'circle',
            types: {
                designers: {
                    r: 10,
                    fill: '#00536B',
                    opacity: 1,
                },
            }
        },
        type: {
            render: 'circle',
            types: {
                designers: {
                    r: 8,
                    fill: '#FFC312',
                    opacity: 1,
                },
            }
        },
        // placement: 'on_water',
        // type: 'academic_research',
    }
}

const features = [
    {
        city: 'saint-petersburg',
        attributes: {
            authorType: 'developers',
            placement: 'on_water',
            type: 'academic_research',
        },
        location: [30.235576, 59.928145],
    },
    {
        city: 'saint-petersburg',
        attributes: {
            authorType: 'artists',
            placement: 'on_water',
            type: 'academic_research',
        },
        location: [30.205556, 59.954418],
    },
    {
        city: 'saint-petersburg',
        attributes: {
            authorType: 'designers',
            placement: 'on_water',
            type: 'academic_research',
        },
        location: [30.240918, 59.965245],
    },
    {
        city: 'saint-petersburg',
        attributes: {
            authorType: 'designers',
            placement: 'on_water',
            type: 'academic_research',
        },
        location: [30.335332, 59.954418],
    },
    {
        city: 'saint-petersburg',
        attributes: {
            authorType: 'designers',
            placement: 'on_water',
            type: 'academic_research',
        },
        location: [30.388203, 59.926559],
    },
    {
        city: 'saint-petersburg',
        attributes: {
            authorType: 'designers',
            placement: 'on_water',
            type: 'academic_research',
        },
        location: [30.278684, 59.927247],
    },
]

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

const style = `https://api.maptiler.com/maps/495bac53-4c52-4e14-b9d1-3bd481a5be26/style.json?key=${key}`

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
        renderAttribute('authorType', feature.attributes.authorType, options),
        renderAttribute('placement', feature.attributes.authorType, options),
        renderAttribute('type', feature.attributes.authorType, options),
        // svgCircle({
        //     cx: r,
        //     cy: r,
        //     r: 15,
        //     fill: '#4F7986',
        //     opacity: 1,
        // }),
        // svgCircle({
        //     cx: r,
        //     cy: r,
        //     r: 12,
        //     fill: '#F79F1F',
        //     opacity: 1,
        // }),
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
    const p = palette.attributes[name]

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

function svgCircle({ cx, cy, r, fill, opacity }) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" fill-opacity="${opacity}"/>`
}

function htmlElementFromString(html, container = 'div') {
    const element = document.createElement(container)
    element.innerHTML = html

    return element
}
