import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/cavalo', (request, reply) => {
// Acessando dados do corpo da requisição
    const {raca, adestrador, altura, peso} = request.body
// Exibindo dados
//    console.log(body)
   
    // return 'cadastrar'
    database.create({
        raca: raca,
        adestrador: adestrador,
        altura: altura,
        peso: peso,
    })

    return reply.status(201).send
})

server.get('/cavalo', (request) => {
    const search = request.query.search
    console.log(search)
    const cavalo = database.list(search)
    console.log(cavalo)
    return cavalo
})

server.put('/cavalos/:id', (request, reply) => {
    const cavaloId = request.params.id
    const {raca, adestrador, altura, peso} = request.body
    const cavalo = database.update(cavaloId, {
        raca: raca,
        adestrador: adestrador,
        altura: altura, 
        peso: peso
    })
    return reply.status(204).send()
})

server.delete('/cavalos/:id', (request, reply) => {
    const cavaloId = request.params.id

    database.delete(cavaloId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})