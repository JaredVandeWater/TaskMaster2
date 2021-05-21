import { generateId } from "../Utils/genId.js"

export class Card{
    constructor({title, color, id=generateId()}){
        this.title=title
        this.color=color
        this.id=id
    }
}