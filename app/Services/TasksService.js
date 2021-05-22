import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"


const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})




class TasksService{
    addTask(taskData){
        ProxyState.tasks = [...ProxyState.tasks, new Task(taskData)]
        ProxyState.tasks=ProxyState.tasks
        Toast.fire({
        icon: 'info',
        title: 'Task Created!'
        })
        
    }
    removeTask(taskId){
        Swal.fire({
        title: 'Remove Task?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remove'
        }).then((result) => {
        if (result.isConfirmed) {
            let task= ProxyState.tasks.find(t=>t.id===taskId)
            Toast.fire({
            icon: 'error',
            title: `Removed Task: ${task.name}`
            })
            ProxyState.tasks = ProxyState.tasks.filter(t => t.id != taskId)
        }
        })

    }
    checkboxChecker(taskId, isChecked){
    let task= ProxyState.tasks.find(t=>t.id===taskId)


    Toast.fire({
    icon: 'success',
    title: `Completed: ${task.name}`
    })
        
    }
}

export const taskService = new TasksService()