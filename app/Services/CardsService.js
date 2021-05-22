import { ProxyState } from "../AppState.js"
import { Card } from "../Models/Card.js"


const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000000,
  timerProgressBar: true,
  customClass: 'my-toast',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

class CardsService{
    addCard(cardData){
        ProxyState.cards=[new Card(cardData), ...ProxyState.cards]
        let latestCard= ProxyState.cards[0]
        Toast.fire({
        icon: '',
        title: `New Card: ${latestCard.title}`
        })
    }
    removeCard(cardId){
        ProxyState.cards = ProxyState.cards.filter(c => c.id != cardId)
        ProxyState.tasks=ProxyState.tasks.filter(t=>t.cardId!= cardId)
    }
}

export const cardService = new CardsService()