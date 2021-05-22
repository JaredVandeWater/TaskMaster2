import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"

class TasksService{
    addTask(taskData){
        ProxyState.tasks = [...ProxyState.tasks, new Task(taskData)]

    }
    removeTask(taskId){
        ProxyState.tasks = ProxyState.tasks.filter(t => t.id != taskId)

    }
}

export const taskService = new TasksService()