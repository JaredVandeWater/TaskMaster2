import { generateId } from "../Utils/genId.js"

export class Task{
    constructor({name, checked=false, cardId, id=generateId()}){
        this.name=name
        this.checked=checked
        this.cardId = this.cardId
        this.id=id
    }
}