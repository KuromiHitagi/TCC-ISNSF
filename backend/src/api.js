import express from 'express'
import cors from 'cors'
import path from 'path'
import Rotas from './routes.js'

const endpoint = express()
endpoint.use(express.json())
endpoint.use(cors())

endpoint.use('/image', express.static(path.join(process.cwd(), 'public', 'image')))

Rotas(endpoint)

endpoint.listen(5000, () => console.log("API rodando na porta 5000"))