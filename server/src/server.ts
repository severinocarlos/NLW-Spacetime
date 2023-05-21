import 'dotenv/config'

import jwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from "@fastify/multipart"
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify()

app.register(multipart)

app.register(require('@fastify/static'), {
    root: resolve(__dirname, '../uploads'),
    prefix: '/uploads'
})

app.register(cors, {
    origin: true
})

app.register(jwt, {
    secret: 'u89quenrv98245btnaehr98g44059hy0t',
})

app.register(memoriesRoutes)
app.register(authRoutes)
app.register(uploadRoutes)



app
    .listen({
        port: 3333,
        host: '0.0.0.0'
    }).then(() => {
        console.log('🚀Server runinng on http://localhost:3333')
    })