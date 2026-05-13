import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import loggerConfig from '../config/logger.mjs'
import helmet from 'helmet'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const middleware = (app) => {
	app.use(helmet())
	app.use(cors())

	app.use(loggerConfig)

	app.use(express.json({ limit: '10mb' }))
	app.use(express.urlencoded({ extended: false, limit: '10mb' }))

	app.use(express.static(path.join(__dirname, '../public')))
}

export default middleware
