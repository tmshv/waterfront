import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
    typographer: true,
    quotes: '«»‘’',
})

let config = null

const FEATURE_GEOMETRY_TYPE_POINT = 'Point'

function renderMarkdown(text) {
    return md.renderInline(text)
}

async function json(url) {
    const res = await fetch(url)
    return res.json()
}

function createOsmStyle() {
    return {
        style: {
            "version": 8,
            "sources": {
                "simple-tiles": {
                    "type": "raster",
                    "tiles": [
                        "http://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        "http://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
                        "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    ],
                    "tileSize": 128,
                },
            },
            "layers": [
                {
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "simple-tiles",
                    "minzoom": 0,
                    "maxzoom": 22
                },
            ]
        }
    }
}

function createMapboxStyle() {
    const mapboxAccessKey = 'pk.eyJ1IjoidG1zaHYiLCJhIjoiY2p1bDljc3diMXd5cDQ0cGdvYnNzenJociJ9.RrSRbUiEKsCecdtNnXKzxg'

    return {
        style: 'mapbox://styles/mapbox/light-v9',
        accessToken: mapboxAccessKey,
    }
}

function createMaptilerStyle() {
    const key = 'BANyZrASqDKOtn6kEAe9'
    const mapName = 'positron'

    return {
        style: `https://api.maptiler.com/maps/${mapName}/style.json?key=${key}`
    }
}

export async function initMap(htmlElement, options) {
    const styleOptions = createMaptilerStyle()
    const map = new mapboxgl.Map({
        ...options.map,
        ...styleOptions,
        container: htmlElement,
    })

    // map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.AttributionControl(options.attribution))

    return new Promise(resolve => {
        map.on('load', () => {
            resolve(map)
        })
    })
}

function isFeatureGeometryTypeOf(feature, geometryType) {
    return feature.geometry.type === geometryType
}

export function updateMap(map, { sources, layers }) {
    sources.forEach(x => {
        const { id, ...source } = x
      
        if (!map.getSource(id)) {
            map.addSource(id, source)
        }
    })

    layers.forEach(x => {
        const layerId = x.id
        const { visible, ...layerOptions} = x

        if (!map.getLayer(layerId)) {
            map.addLayer(layerOptions)
        }

        const visibility = visible ? 'visible' : 'none'
        map.setLayoutProperty(layerId, 'visibility', visibility)
    })

    map.on('click', e => {
        // removeElementsByClass('feature-preview')

        const features = map.queryRenderedFeatures(e.point, {
            // layers: [activeLayer] // replace this with the name of the layer
        });

        if (!features.length) {
            return
        }

        const selectedFeature = features[0]

        if (!isFeatureGeometryTypeOf(selectedFeature, FEATURE_GEOMETRY_TYPE_POINT)) {
            return
        }

        // map.flyTo({
        //     center: selectedFeature.geometry.coordinates,
        //     // zoom: 13,
        // });

        const preview = createFeaturePreview(selectedFeature)
        // const previewElement = createFeaturePreviewContainer()
        // previewElement.innerHTML = preview

        var popup = createPopup({
            // offset: [0, -15],
            // closeOnClick: false,
            closeButton: false,
            offset: 25,
            className: 'wf-popup',
            // anchor: 'bottom',
        })
            .setLngLat(selectedFeature.geometry.coordinates)
            .setHTML(preview) // CHANGE THIS TO REFLECT THE PROPERTIES YOU WANT TO SHOW
            .addTo(map);

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
    })

    // map.on('mouseenter', () => {
    //     map.getCanvas().style.cursor = 'pointer'
    // })

    // map.on('mouseleave', () => {
    //     map.getCanvas().style.cursor = ''
    // })
}

function createPopup(options) {
    return new mapboxgl.Popup(options)
}

function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function createFeaturePreviewContainer() {
    const element = document.createElement('div')
    element.classList.add('feature-preview')
    element.classList.add('wf-popup')

    document.body.appendChild(element)

    return element
}

function createFeaturePreview(feature) {
    const { slug, previewImage, name, short, year } = feature.properties
    const url = slug
        ? `//waterfront.tools/projects/${slug}`
        : '//waterfront.tools'
    const shortContent = short
        ? `<p>${renderMarkdown(short)}</p>`
        : ''
    const yearContent = year
        ? `<p class="date">${year}</p>`
        : ''
    // console.log(feature.properties)
    // console.log(shortContent)


    return (`
        <a href="${url}">
            <div class="wf-popup-content">
                ${yearContent}
                <h3>${renderMarkdown(name)}</h3>
                ${shortContent}
            </div>

            <div class="preview-image">
                <img src="${previewImage}" />
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
