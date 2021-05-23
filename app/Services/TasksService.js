import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"
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


class TasksService{
    


    addTask(taskData){
        ProxyState.tasks = [...ProxyState.tasks, new Task(taskData)]
        saveState()
        let latestTask= ProxyState.tasks[ProxyState.tasks.length-1]
        Toast.fire({
        icon: 'info',
        title: `Task Created${latestTask.name.length>18 ? '' : `: ${latestTask.name}`}`
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
            title: `Removed${task.name.length>18 ? ' Task' : `: ${task.name}`}`
            })
            ProxyState.tasks = ProxyState.tasks.filter(t => t.id != taskId)
            saveState()
        }
        })

    }
    checkboxChecker(taskId){
        let task= ProxyState.tasks.find(t=>t.id===taskId)
        let taskIndex = ProxyState.tasks.indexOf(task)
        task.checked = !task.checked
        ProxyState.tasks.splice(taskIndex, 1, task)
        ProxyState.tasks=ProxyState.tasks
        saveState()

        if(task.checked){
        Toast.fire({
        icon: 'success',
        title: `Completed${task.name.length>18 ? ' Task' : `: ${task.name}`}`
        })}
        
    }
}

export const taskService = new TasksService()