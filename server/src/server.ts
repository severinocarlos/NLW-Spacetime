import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'


const app = fastify()
const prisma = new PrismaClient()

app.get('/users', async () => {
    const users = await prisma.users.findMany()

    return users
})


app.listen({
    port: 3333
}).then(() => {
    console.log('🚀Server runinng on http://localhost:3333')
})