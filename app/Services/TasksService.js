import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"


const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 3008588585850,
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

class TasksService{
    addTask(taskData){
        ProxyState.tasks = [...ProxyState.tasks, new Task(taskData)]
        ProxyState.tasks=ProxyState.tasks
        Toast.fire({
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
    checkboxChecker(taskId){
        let task= ProxyState.tasks.find(t=>t.id===taskId)
        let taskIndex = ProxyState.tasks.indexOf(task)
        task.checked = !task.checked
        ProxyState.tasks.splice(taskIndex, 1, task)
        ProxyState.tasks=ProxyState.tasks
        console.log(ProxyState.tasks);

        Toast.fire({
        icon: 'success',
        title: `Completed: ${task.name}`
        })
        
    }
}

export const taskService = new TasksService()