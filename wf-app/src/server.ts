import next from 'next'
import express from 'express'

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/projects', (req, res) => {
            const actualPage = '/projects'
            const queryParams = {
                city: 'all'
            }

            app.render(req, res, actualPage, queryParams)
        })

        server.get('/projects/:city', (req, res) => {
            const actualPage = '/projects'
            const queryParams = {
                city: req.params.city
            }

            app.render(req, res, actualPage, queryParams)
        })

        server.get('/project/:slug', (req, res) => {
            const actualPage = '/project'
            const queryParams = {
                slug: req.params.slug
            }

            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => { return handle(req, res) })

        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })