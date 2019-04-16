import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
                    
                    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.js'></script>
                    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.1/mapbox-gl.css' rel='stylesheet' />

                    {/* <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" /> */}
                    {/* <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link> */}
                    <link href="/static/style.css" rel="stylesheet"></link>
                </Head>
                <body>
                    <main>
                        <Main />
                    </main>
                    <NextScript />
                </body>
            </html>
        )
    }
}