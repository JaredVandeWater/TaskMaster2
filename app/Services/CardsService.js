import { ProxyState } from "../AppState.js"
import { Card } from "../Models/Card.js"
import { saveState } from "../Utils/LocalStorage.js"


const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  customClass: {
    container: 'my-swal-container',
    popup: 'my-toast',
    header: 'your-header-class',
    title: 'my-swal-title',
    closeButton: 'your-close-button-class',
    icon: 'my-swal-icon',
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
        ProxyState.cards=[...ProxyState.cards, new Card(cardData)]
        saveState()
        let latestCard= ProxyState.cards[ProxyState.cards.length-1]
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
        Toast.fire({
        icon: 'info',
        title: `Card Created: ${latestCard.title}`
        })
    }
    removeCard(cardId){
        Swal.fire({
        title: 'Remove Card?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remove'
        }).then((result) => {
        if (result.isConfirmed) {
            let card= ProxyState.cards.find(c=>c.id===cardId)
            Toast.fire({
            icon: 'error',
            title: `Removed${card.title.length>18 ? ' Task' : `: ${card.title}`}`
            })
        ProxyState.cards = ProxyState.cards.filter(c => c.id != cardId)
        ProxyState.tasks=ProxyState.tasks.filter(t=>t.cardId!= cardId)
        saveState()
        }
        })

    }
}

export const cardService = new CardsService()