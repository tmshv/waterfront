let config = null

async function json(url) {
    const res = await fetch(url)
    return res.json()
}

async function main() {
    const attribution = [
        '<a href="https://unit4.io" target="_blank">design::unit</a>',
    ].join('')

    const currentCity = 'saint-petersburg'
    const center = [30.344087, 59.932924]
    const zoom = 11
    const key = 'BANyZrASqDKOtn6kEAe9'
    // const mapName = '495bac53-4c52-4e14-b9d1-3bd481a5be26'
    const mapName = 'positron'
    const style = `https://api.maptiler.com/maps/${mapName}/style.json?key=${key}`

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

    // map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.AttributionControl({
        compact: true,
        customAttribution: attribution,
    }));

    map.on('load', () => {
        map.addSource('features', {
            type: 'geojson',
            data: './features.json',
            // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        });

        map.addLayer({
            id: 'featuresShadow',
            source: 'features',
            type: 'circle',
            paint: {
                "circle-color": "black",
                "circle-opacity": 1,
                "circle-blur": 0.5,
                "circle-radius": 24
            }
        })

        map.addLayer({
            id: 'featuresActorType',
            source: 'features',
            type: 'circle',
            paint: {
                'circle-color': [
                    'match',
                    ['get', 'actorType'],
                    "artist", "#f19698",
                    "activist", "#9898cb",
                    "developer", "#facb99",
                    "designer", "#edcce3",
                    "scientist", "#eb6568",
                    "authority", "#cde3c2",
                    "complex", "#996767",
                    /* other */ 'black'
                ],
                "circle-opacity": 1,
                "circle-radius": 21
            }
        })

        map.addLayer({
            id: 'featuresInitiativeType',
            source: 'features',
            type: 'circle',
            paint: {
                'circle-color': [
                    'match',
                    ['get', 'initiativeType'],
                    "art_intervention", "#009fdb",
                    "urban_intervention", "#2f46d1",
                    "instalation", "#9f1f80",
                    "public_research", "#e44892",
                    "private_research", "#e21d2f",
                    "academic_research", "#ec7c23",
                    "public_project", "#99bc36",
                    "private_project", "#ffe800",
                    "academic_project", "#009447",
                    /* other */ 'black'
                ],
                "circle-opacity": 1,
                "circle-radius": 14
            }
        })

        map.addLayer({
            id: 'featuresPlacementType',
            source: 'features',
            type: 'circle',
            paint: {
                'circle-color': [
                    'match',
                    ['get', 'placementType'],
                    "on_water", "#59070c",
                    "on_special_designs_on_the_water", "#871811",
                    "on_the_mound", "#5e3c23",
                    "on_the_shore", "#272d63",
                    "on_coastal_complexes", "#016661",
                    /* other */ 'black'
                ],
                "circle-opacity": 1,
                "circle-radius": 7
            }
        })
    })

    const activeLayer = 'featuresActorType'

    map.on('click', e => {
        removeElementsByClass('feature-preview')

        const features = map.queryRenderedFeatures(e.point, {
            layers: [activeLayer] // replace this with the name of the layer
        });

        if (!features.length) {
            return
        }

        const selectedFeature = features[0]

        // map.flyTo({
        //     center: selectedFeature.geometry.coordinates,
        //     // zoom: 13,
        // });

        console.log(selectedFeature)

        const preview = createFeaturePreview(selectedFeature)
        const previewElement = createFeaturePreviewContainer()
        previewElement.innerHTML = preview

        var popup = createPopup({
            // offset: [0, -15],
            // closeOnClick: false,
            closeButton: false,
            offset: 25,
            className: 'wf-popup',
            // anchor: 'bottom',
        })
            .setLngLat(selectedFeature.geometry.coordinates)
            .setHTML(createFeaturePreview(selectedFeature)) // CHANGE THIS TO REFLECT THE PROPERTIES YOU WANT TO SHOW
            .setLngLat(selectedFeature.geometry.coordinates)
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

    map.on('mouseenter', activeLayer, () => {
        map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave', activeLayer, () => {
        map.getCanvas().style.cursor = ''
    })
}

main()

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
    const img = 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1498156851%2Fopera-house-oslo-norway-OSLO0617.jpg%3Fitok%3DrcuoL2da&q=85'
    const url = 'http://waterfront.tools'
    const title = 'Название проекта длинное. В две строки'
    const date = '1 January 1970'
    const short = `                    
    Краткое описание. For example, MercatorCoordinate(0, 0, 0)
    is the north-west corner of the mercator world and MercatorCoordinate(1, 1, 0) is the south-east corner.
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
