import { generateId } from "../Utils/genId.js"

export class Task{
    constructor({name, cardId, checked, id=generateId()}){
        this.name=name
        this.cardId = cardId
        this.id=id
        this.checked = checked
    }
}