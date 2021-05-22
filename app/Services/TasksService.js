import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"

class TasksService{
    addTask(taskData){
        ProxyState.tasks = [...ProxyState.tasks, new Task(taskData)]
        ProxyState.tasks=ProxyState.tasks
        console.log(ProxyState.tasks);

    }
    removeTask(taskId){
        ProxyState.tasks = ProxyState.tasks.filter(t => t.id != taskId)
        console.log(ProxyState.tasks);

    }
}

export const taskService = new TasksService()