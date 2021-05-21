import { ProxyState } from "../AppState.js"
import { Card } from "../Models/Card.js"

class CardsService{
    addCard(cardData){
        ProxyState.cards=[...ProxyState.cards, new Card(cardData)]
    }
    removeCard(cardId){
        ProxyState.cards = ProxyState.cards.filter(c => c.id != cardId)
        ProxyState.cards = ProxyState.cards
    }
}

export const cardService = new CardsService()