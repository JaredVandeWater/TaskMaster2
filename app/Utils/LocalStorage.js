import { ProxyState } from "../AppState.js";
import { Card } from "../Models/Card.js";
import { Task } from "../Models/Task.js";

export function saveState(){
    localStorage.setItem('TMStorage', JSON.stringify({
        cards: ProxyState.cards,
        tasks : ProxyState.tasks
    }))
}

export function loadState(){
    let data = JSON.parse(localStorage.getItem('TMStorage'))
    if (data != null){
        ProxyState.cards = data.cards.map(card => new Card(card))
        ProxyState.tasks = data.tasks.map(task => new Task(task))
    }
}