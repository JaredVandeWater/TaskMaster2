import { ProxyState } from "../AppState.js"
import { CardsController } from "../Controllers/CardsController.js"
import { Card } from "../Models/Card.js"

class CardsService{
    addCard(cardData){
        ProxyState.cards=[...ProxyState.cards, new Card(cardData)]
    }
    removeCard(cardId){
        ProxyState.cards = ProxyState.cards.filter(c => c.id != cardId)
    }
}

export const cardService = new CardsService()