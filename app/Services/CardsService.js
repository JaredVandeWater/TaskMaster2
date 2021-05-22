import { ProxyState } from "../AppState.js"
import { Card } from "../Models/Card.js"


const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    container: 'my-swal-container',
    popup: 'my-toast',
    header: 'your-header-class',
    title: 'your-title-class',
    closeButton: 'your-close-button-class',
    image: 'your-image-class',
    content: 'your-content-class',
    input: 'your-input-class',
    actions: 'your-actions-class',
    confirmButton: 'your-confirm-button-class',
    cancelButton: 'your-cancel-button-class',
    footer: 'your-footer-class'
},
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
        title: `New Card: ${latestCard.title}`
        })
    }
    removeCard(cardId){
        ProxyState.cards = ProxyState.cards.filter(c => c.id != cardId)
        ProxyState.tasks=ProxyState.tasks.filter(t=>t.cardId!= cardId)
    }
}

export const cardService = new CardsService()