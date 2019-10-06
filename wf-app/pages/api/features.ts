import fetch from 'isomorphic-unfetch'

import { NextApiRequest, NextApiResponse } from 'next'

function apiUrl(path: string) {
    const baseUrl = 'https://wf.tmshv.com'

    return baseUrl + path
}

export async function json(url: string) {
    const res = await fetch(url)

    return res.json()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // const layerId = req.query.layer
    // const layerResponse = await api.get<ILayer>(`/layers/${layerId}`)
    // const featureIds = layerResponse.data.featureIds
    // const features = await getFeatures(featureIds)
    // const geojson = createGeojson(features)

    const response = await json(apiUrl('/api/_/items/features'))
    const d = response['data']
        
    try {
        res.json(d)
    } catch (error) {
        res.status(500).json({
            error,
        })
    }
}

// async def api_data(kind):
// url = api_url(f'/api/_/items/{kind}')

// async with aiohttp.ClientSession() as session:
// async with session.get(url) as resp:
// data = await resp.json()
// return data['data']

// async def api_feature_by_slug(slug):
// url = api_url(f'/api/_/items/features?filter[slug][eq]={slug}')

// async with aiohttp.ClientSession() as session:
// async with session.get(url) as resp:
// res_data = await resp.json()
// data = res_data['data']
// if len(data) == 0:
//     return None
// return data[0]


// async def api_image(image_id):
// url = api_url(f'/api/_/files/{image_id}')

// async with aiohttp.ClientSession() as session:
// async with session.get(url) as resp:
// data = await resp.json()
// return data['data']


// def create_image_url(image):
// width = 200
// height = 200
// action = 'contain'
// quality = 'good'
// filename = image['filename']

// return image['data']['full_url']

// # return f'https://wf.tmshv.com/thumbnail/_/{width}/{height}/{action}/{quality}/{filename}'


// def clean(obj):
// out = {}
// for k, v in obj.items():
//     if v is not None:
// out[k] = obj[k]
// return out


// @app.route('/')
// async def home(request):
// return json({
//     'usage': '/<lang>/<city>/<status>/features',
//     'enums': {
//         'lang': ['ru', 'en', '__any__'],
//         'city': ['saint_petersburg', 'shockholm', '__any__'],
//         'status': ['published', 'draft'],
//     }
// })


// @app.route('/<lang>/persons')
// @cross_origin(app)
// async def get_persons(request, lang):
// name_field = f'name_{lang}'
// content_field = f'content_{lang}'

// items = await api_data('persons')
// result = []
// for item in items:
//     if item['preview_image']:
//         image_data = await api_image(item['preview_image'])
// image = create_image_url(image_data)
//         else:
// image = None
// result.append({
//     'name': item[name_field],
//     'content': item[content_field],
//     'previewImage': image,
//     'role': item['role'],
// })

// return json(result)


// @app.route('/<lang>/features/<slug>')
// @cross_origin(app)
// async def get_feature(request, lang, slug):
// """
// API Item structure
// {
//     "id": 1,
//         "status": "published",
//             "created_by": 1,
//                 "created_on": "2019-04-14 18:34:35",
//                     "location": {
//         "lat": 59.92663548229322,
//             "lng": 30.23119926452637
//     },
//     "name_ru": "WF",
//         "name_en": "WF",
//             "content_ru": "content",
//                 "content_en": "content",
//                     "actor_type": "artist",
//                         "project_type": "art_intervention",
//                             "preview_image": 6
// }
//     : param request:
//     : param lang:
//     : param city:
//     : param status:
//     : return:
// """
// name_field = f'name_{lang}'
// short_field = f'short_{lang}'
// content_field = f'content_{lang}'

// item = await api_feature_by_slug(slug)

// if not item:
//     return json({
//         'error': 'not found'
//     })

// if item['preview_image']:
//     image_data = await api_image(item['preview_image'])
// image = create_image_url(image_data)
//     else:
// image = None

// properties = {
//     'city': item['city'],
//     'actorType': item['actor_type'],
//     'slug': item['slug'],
//     'year': item['year'],
//     # 'placementtype': item['placement_type'],
//     'projectType': item['project_type'],
//     'name': item[name_field],
//     'short': item[short_field],
//     'content': item[content_field],
//     'previewImage': image,
// }

// return json({
//     'type': 'FeatureCollection',
//     'features': [{
//         'type': 'Feature',
//         'properties': clean(properties),
//         'geometry': {
//             'type': 'Point',
//             'coordinates': [
//                 item['location']['lng'],
//                 item['location']['lat'],
//             ]
//         }
//     }],
// })


// @app.route('/<lang>/<city>/<status>/features')
// @cross_origin(app)
// async def get_features(request, lang, city, status):
// """
// API Item structure
// {
//     "id": 1,
//         "status": "published",
//             "created_by": 1,
//                 "created_on": "2019-04-14 18:34:35",
//                     "location": {
//         "lat": 59.92663548229322,
//             "lng": 30.23119926452637
//     },
//     "name_ru": "WF",
//         "name_en": "WF",
//             "content_ru": "content",
//                 "content_en": "content",
//                     "actor_type": "artist",
//                         "project_type": "art_intervention",
//                             "preview_image": 6
// }
//     : param request:
//     : param lang:
//     : param city:
//     : param status:
//     : return:
// """
// name_field = f'name_{lang}'
// short_field = f'short_{lang}'

// data = await api_features()
// features = []

// full = request.args.get('full', False)
// all_cities = city == 'all'

// for item in data:
//     if not all_cities and item['city'] != city:
// continue

// if item['status'] != status:
//     continue

// if item['preview_image']:
//     image_data = await api_image(item['preview_image'])
// image = create_image_url(image_data)
//         else:
// image = None

// properties = {
//     'city': item['city'],
//     'actorType': item['actor_type'],
//     'slug': item['slug'],
//     'year': item['year'],
//     # 'placementtype': item['placement_type'],
//     'projectType': item['project_type'],
//     'name': item[name_field],
//     'short': item[short_field],
//     'previewImage': image,
// }
// if full:
//     content_field = f'content_{lang}'
// properties['content'] = item[content_field]

// features.append({
//     'type': 'Feature',
//     'properties': clean(properties),
//     'geometry': {
//         'type': 'Point',
//         'coordinates': [
//             item['location']['lng'],
//             item['location']['lat'],
//         ]
//     }
// })

// return json({
//     'type': 'FeatureCollection',
//     'features': features,
// })


// if __name__ == '__main__':
//     import os
//     port = os.environ.get('PORT', 5000)
// app.run(host = '0.0.0.0', port = port)
