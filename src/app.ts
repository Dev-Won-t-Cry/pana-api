/* eslint-disable @typescript-eslint/no-var-requires */
import cors from 'cors'
import express, { json, Request, Response, urlencoded } from 'express'
import routes from './routes'

const app = express()

app.use(cors({ origin: '*' }))
app.use(json({ limit: '50mb' }))
app.use(urlencoded({ limit: '50mb', extended: true }))

app.get('/', (req: Request, res: Response) => {
	res.status(200).json({
		name: 'Pana API',
		version: process.env.npm_package_version,
		env: process.env.ENVIRONMENT
	})
})

app.use('/', routes)

export default app
