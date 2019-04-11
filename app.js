const attribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'

// const center = [59.932924, 30.344087]
const center = [30.344087, 59.932924]
const zoom = 11
const key = 'BANyZrASqDKOtn6kEAe9'

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

// // create the popup
// const popup = new mapboxgl.Popup({ offset: 25 })
//     .setText('WF')

var popup = new mapboxgl.Popup({
    closeOnClick: false
})
    .setLngLat(center)
    .setHTML('<h1>WF</h1>')
    .addTo(map)

var marker = new mapboxgl.Marker({})
    .setLngLat(center)
    .addTo(map)

// // create DOM element for the marker
// const el = document.createElement('div')
// el.id = 'marker'

// // create the marker
// new mapboxgl.Marker(el)
//     .setLngLat(center)
//     // .setPopup(popup) // sets a popup on this marker
//     .addTo(map)