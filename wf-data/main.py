import aiohttp

from sanic import Sanic
from sanic.response import json

app = Sanic()


@app.route('/')
async def test(request):
    return json({'hello': 'world'})


@app.route('/features')
async def test(request):
    url = 'https://wf.tmshv.com/api/_/items/features'

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            data = await resp.json()

            return json(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
