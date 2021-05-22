import { ProxyState } from "../AppState.js"
import { cardService } from "../Services/CardsService.js"
import { taskService } from "../Services/TasksService.js"
import { loadState } from "../Utils/LocalStorage.js"


 function _drawCards(){
            let template=''
            ProxyState.cards.forEach(c=>{
                let thisCardsTasks = ProxyState.tasks.filter(t=>t.cardId===c.id)
                template+=`
                    <div class="justify-content-center col-lg-3 col-md-4 my-auto pt-2">
                    <div class="card shadow">
                        <div>
                            <div class="text-center my-white-text" style="background-color: ${c.color};">
                                <div class="d-flex justify-content-end">
                                    <button onclick="app.cardsController.removeCard('${c.id}')" class="btn my-x-btn">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </div>
                                <h3 class="card-title pt-2 ">${c.title}</h3>
                                <h4>Tasks Completed</h4>
                                <h5 class="pb-2"><span>${thisCardsTasks.filter(t => t.checked === true).length}</span> / <span>${thisCardsTasks.length}</span></h5>
                            </div>
                            `
                            
                            thisCardsTasks.forEach(t => {

                                template+=/*html*/
                                `
                                <ul class="d-flex flex-column">
                                <label class="form-check-label sr-only" for="exampleCheck1">Task completed
                                    Checkbox</label>
                                <input title="Task Completed" type="checkbox" class="form-check-input" onclick="app.cardsController.checkboxChecker('${t.id}')" ${t.checked ? 'checked' : ''}
                                    id="exampleCheck1">
                                <div class="d-flex justify-content-between">
                                    <li style="text-decoration-color: ${c.color};" class="my-li ${t.checked ? 'my-strike' : ''}"><h5>${t.name}</h5></li>
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

function setColorPicker(){
    document.getElementById('color').setAttribute('value', `#${Math.floor(Math.random()*16777215).toString(16)}`)
}

export class CardsController{
    constructor(){
        setColorPicker()
        loadState()
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
        setColorPicker()
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
    checkboxChecker(taskId){
        taskService.checkboxChecker(taskId)
    }
}