import 'dotenv/config'

import jwt from '@fastify/jwt'
import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(cors, {
    origin: true
})

app.register(jwt, {
    secret: 'u89quenrv98245btnaehr98g44059hy0t',
})

app.register(memoriesRoutes)
app.register(authRoutes)



app
    .listen({
        port: 3333
    }).then(() => {
        console.log('🚀Server runinng on http://localhost:3333')
    })