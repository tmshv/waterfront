import aiohttp

from sanic import Sanic
from sanic.response import json
from sanic_cors import cross_origin

app = Sanic()


async def api_features():
    url = 'https://wf.tmshv.com/api/_/items/features'

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            data = await resp.json()
            return data['data']


async def api_image(image_id):
    url = f'https://wf.tmshv.com/api/_/files/{image_id}'

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            data = await resp.json()
            return data['data']


def create_image_url(image):
    width = 200
    height = 200
    action = 'contain'
    quality = 'good'
    filename = image['filename']

    return image['data']['full_url']

    # return f'https://wf.tmshv.com/thumbnail/_/{width}/{height}/{action}/{quality}/{filename}'


@app.route('/')
async def home(request):
    return json({
        'usage': '/<lang>/<city>/<status>/features',
        'enums': {
            'lang': ['ru', 'en', '__any__'],
            'city': ['saint_petersburg', 'shockholm', '__any__'],
            'status': ['published', 'draft'],
        }
    })


@app.route('/<lang>/<city>/<status>/features')
@cross_origin(app)
async def get_features(request, lang, city, status):
    """
    API Item structure
    {
      "id": 1,
      "status": "published",
      "created_by": 1,
      "created_on": "2019-04-14 18:34:35",
      "location": {
        "lat": 59.92663548229322,
        "lng": 30.23119926452637
      },
      "name_ru": "WF",
      "name_en": "WF",
      "content_ru": "content",
      "content_en": "content",
      "actor_type": "artist",
      "project_type": "art_intervention",
      "preview_image": 6
    }
    :param request:
    :param lang:
    :param city:
    :param status:
    :return:
    """
    name_field = f'name_{lang}'

    data = await api_features()
    features = []

    for item in data:
        if item['city'] != city:
            continue

        if item['status'] != status:
            continue

        if item['preview_image']:
            image_data = await api_image(item['preview_image'])
            image = create_image_url(image_data)
        else:
            image = None

        features.append({
            'type': 'Feature',
            'properties': {
                'city': city,
                'actorType': item['actor_type'],
                # 'placementType': item['placement_type'],
                'projectType': item['project_type'],
                'name': item[name_field],
                'previewImage': image,
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [
                    item['location']['lng'],
                    item['location']['lat'],
                ]
            }
        })

    return json({
        'type': 'FeatureCollection',
        'features': features,
    })


if __name__ == '__main__':
    import os
    port = os.environ.get('PORT', 5000)
    app.run(host='0.0.0.0', port=port)
