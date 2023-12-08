import { randomUUID } from "crypto"

export class DatabaseMemory{
#cavalos = new Map()

list(search){
    return Array.from(this.#cavalos.entries()).map((cavalosArray) =>{
    // acessando primeira posição
        const id = cavalosArray[0]
        const data = cavalosArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(cavalo => {
        if (search){
            return cavalo.titulo.includes(search)
        }
        return true
    })
}
create(cavalo){
    const cavaloId = randomUUID()
    this.#cavalos.set(cavaloId, cavalo)
}
update(id, cavalo){
    this.#cavalos.set(id, cavalo)
}
delete(id, cavalo){
    this.#cavalos.delete(id, cavalo)
}
}