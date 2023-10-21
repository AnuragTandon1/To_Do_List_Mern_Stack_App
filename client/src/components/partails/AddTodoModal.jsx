import React ,{useState} from 'react'
import { createTodoApi } from '../../services/Api'
import {message} from 'antd'
function AddTodoModal({setRefreshList}) {
    const[todoDesc , setTodoDesc]=useState('')
    const handleSubmit=async()=>{
        console.log(todoDesc)
        if(todoDesc ===''){
        // alert('Todo is required')
        message.error("Todo is required")
        return 
        }

        const result = await createTodoApi({desc : todoDesc})
        console.log(result)
        if(result.status === 200 && result.data.status === 200){
            // alert('Todo added')
            message.success("Todo added")
            setRefreshList(new Date())
            setTodoDesc('')
        }
        else{
            alert(result.data.message)
        }
    }
  return (
    <div className='modal mt-5' id='exampleModal'>
    <div className='modal-dialog' role="document">
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">Add New Todo</div>
                <button type='button' className='btn-close' data-bs-dismiss="modal" aria-label="close">
                    <span arial-hidden="true"></span>
                </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                    <textarea name='' className='form-control' rows={3} onChange={(e)=>{setTodoDesc(e.target.value)}} placeholder="Enter your todos...."></textarea>
                </div>
            </div>
            <div className="modal-footer">
              
                <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={()=>{setTodoDesc('')}}>Close</button>
                <button className='btn btn-secondary' data-bs-dismiss="modal" onClick={handleSubmit}>Save Todo</button>
            </div>
        </div>
    </div>
   </div>
  )
}

export default AddTodoModal
