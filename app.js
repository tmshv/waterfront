let config = null

async function json(url) {
    const res = await fetch(url)
    return res.json()
}

async function main() {
    const attribution = [
        '<a href="https://unit4.io" target="_blank">design::unit</a>',
    ].join('')

    // const center = [59.932924, 30.344087]
    const center = [30.344087, 59.932924]
    const zoom = 11
    const key = 'BANyZrASqDKOtn6kEAe9'
    // const mapName = '495bac53-4c52-4e14-b9d1-3bd481a5be26'
    const mapName = 'positron'

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
        attributionControl: false,
        container: 'map',
        style,
        center,
        zoom,
    })

    map.on('click', event => {
        console.log('map click', event.lngLat)
    })

    map.addControl(new mapboxgl.AttributionControl({
        compact: true,
        customAttribution: attribution,
    }));

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

        const preview = createFeaturePreview(f)
        // const popup = new mapboxgl.Popup({
        //     // closeOnClick: false,
        //     closeButton: false,
        //     offset: 25,
        //     className: 'wf-popup',
        //     anchor: 'bottom',
        // })
        // popup.setHTML(preview)

        const previewElement = createFeaturePreviewContainer()
        previewElement.innerHTML = preview

        const marker = new mapboxgl.Marker(options)
        marker.setLngLat(f.location)
            // .setPopup(popup)
            .addTo(map)
    }

    // map.addControl(new mapboxgl.NavigationControl());

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', e => {
        console.log(e.features)
        // var coordinates = e.features[0].geometry.coordinates.slice();
        // var description = e.features[0].properties.description;

        // // Ensure that if the map is zoomed out such that multiple
        // // copies of the feature are visible, the popup appears
        // // over the copy being pointed to.
        // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        // }

        // new mapboxgl.Popup()
        //     .setLngLat(coordinates)
        //     .setHTML(description)
        //     .addTo(map);

        // const preview = createFeaturePreview(f)
        // const popup = new mapboxgl.Popup({
        //     // closeOnClick: false,
        //     closeButton: false,
        //     offset: 25,
        //     className: 'wf-popup',
        //     anchor: 'bottom',
        // })
        // popup.setHTML(preview)
    });
}

main()

function createFeaturePreviewContainer() {
    const element = document.createElement('div')
    element.classList.add('feature-preview')
    element.classList.add('wf-popup')

    document.body.appendChild(element)
    
    return element
}

function createFeaturePreview(feature) {
    const img = 'https://cdn.architecturendesign.net/wp-content/uploads/2014/06/6589.jpg'
    const url = 'http://waterfront.tools'
    const title = 'Название проекта длинное. В две строки'
    const date = '1 January 1970'
    const short = `                    
    Краткое описание. For example, MercatorCoordinate(0, 0, 0)
    is the north-west corner of the mercator world and MercatorCoordinate(1, 1, 0) is the south-east corner.
    If you are familiar with vector tiles it may be helpful to think of the coordinate space as
    the 0/0/0 tile with an extent of 1.
    `

    return (`
        <a href="${url}">
            <div class="wf-popup-content">
                <p class="date">${date}</p>
                <h3>${title}</h3>
                <p>${short}</p>
            </div>

            <div class="preview-image">
                <img src="${img}" />
            </div>
        </a>
    `)
}

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
