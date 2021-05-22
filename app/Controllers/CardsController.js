import { ProxyState } from "../AppState.js"
import { cardService } from "../Services/CardsService.js"
import { taskService } from "../Services/TasksService.js"

 function _drawCards(){
            let template=''
            ProxyState.cards.forEach(c=>{
                let thisCardsTasks = ProxyState.tasks.filter(t=>t.cardId===c.id)
                template+=`
                    <div class="col-lg-4 mt-3">
                    <div class="card shadow">
                        <div>
                            <div class="text-center my-white-text" style="background-color: ${c.color};">
                                <div class="d-flex justify-content-end">
                                    <button onclick="app.cardsController.removeCard('${c.id}')" class="btn my-x-btn">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </div>
                                <h3 class="card-title pt-2 ">${c.title}</h3>
                                <h5>Tasks Completed</h5>
                                <p class="pb-2"><span>${ProxyState.tasks.filter(t => t)}</span> / <span>${thisCardsTasks.length}</span></p>
                            </div>
                            
                            `
                            
                            thisCardsTasks.forEach(t => {

                                template+=
                                `
                                <ul class="d-flex flex-column">
                                <label class="form-check-label sr-only" for="exampleCheck1">Task completed
                                    Checkbox</label>
                                <input title="Task Completed" type="checkbox" class="form-check-input"
                                    id="exampleCheck1">
                                <div class="d-flex justify-content-between">
                                    <li class="my-li">${t.name}</li>
                                    <div class="mr-2">
                                        <button title="Delete Task" class="btn my-x-btn" onclick="app.cardsController.removeTask('${t.id}','${c.id}')">
                                            <i class="fa fa-times-circle-o m-0 text-danger"></i>
                                        </button>
                                    </div>
                                </div>
                            </ul>`
                                    });
                            template+=
                            `
                            <form class="form-group" onsubmit="app.cardsController.addTask(event, '${c.id}')">
                                <div class="d-flex">
                                    <input class="form-control ml-2" type="text" id="name" placeholder="New Task..." required minLength="3" maxLength="50">
                                    <button title="Submit New Task" class="btn text-success px-1 pr-2" type="submit"><i
                                            class="fa fa-plus-square fa-lg" aria-hidden="true"></i></i></button>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>`

            })
            document.getElementById('cardsHTML').innerHTML=template
        }


export class CardsController{
    constructor(){
        ProxyState.on('cards',_drawCards)
        ProxyState.on('tasks',_drawCards)
        _drawCards()
    }
       
    

        
    addCard(event){
        event.preventDefault()
        let form=event.target
        let cardData = {
            title: form.title.value,
            color: form.color.value
        }
        cardService.addCard(cardData)
        form.reset()
    }

    removeCard(cardId){
        cardService.removeCard(cardId)
    }

    addTask(event, cardId){
        event.preventDefault()
        let form =event.target
        let taskData = {
            name: form.name.value,
            cardId: cardId
            }
            
        taskService.addTask(taskData)
    }
    removeTask(taskId, cardId){
        taskService.removeTask(taskId, cardId)
    }
}