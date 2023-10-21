import React from 'react'
import moment from 'moment/moment'
import { deleteTodoApi, MarkTodoApi } from '../../services/Api'
import {message} from 'antd'
function Todo({todo , setRefreshList}) {
    const handleDelete =async()=>{
     const result = await deleteTodoApi({
        todo_id : todo._id
     })
     console.log(result)
     if(result.data.status === 200){
        setRefreshList(new Date())
       message.success('Deleted')
     }
     else{
        message.error('failed to delete')
     }
    }
    const handleMark =async()=>{
        const result = await MarkTodoApi({
            todo_id : todo._id
         })
         console.log(result)
         if(result.data.status === 200){
            setRefreshList(new Date())
           message.success(result.data.message)
         }
         else{
            message.error('failed to mark')
         }
    }
  return (
    <div className='col-sm-3 mx-3 my-2 alert bg-light'>
     <div className='card-header m-4'>
         {todo.isCompleted ? 'Completed' : 'Not Completed'}
     </div>
     <div className='card-body m-4'>
   <h4 className='card-title ' style={{textDecoration : todo.isCompleted ? 'line-through' : 'none'}}>{todo.desc}</h4>
   <p className='card-text mt-2'>{moment(todo.date).fromNow()}</p>
   
     </div>
     <div className="actionButtons" style={{display : 'flex',justifyContent : 'space-between',alignItems : 'center'}}>
      <div className="deleteButton" ><button style={{background : 'red'}} onClick={handleDelete}>Delete</button></div>
      <div className="markTodo"><button onClick={handleMark}> {todo.isCompleted ? 'Mark Uncompleted' : 'Mark Completed'}</button></div>
   </div>
    </div>
  )
}

export default Todo
