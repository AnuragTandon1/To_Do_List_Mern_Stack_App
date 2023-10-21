import React, { useEffect , useState} from 'react'
import Todo from './partails/Todo'
import Header from './partails/Header'
import AddTodoModal from './partails/AddTodoModal'
import { getTodoListApi, getToken } from '../services/Api'
import {useNavigate} from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    const [searchText , setSearchText]=useState("")
    const [list , setList]=useState([])
    const [filteredList , setFilteredList]=useState([])

    const [refreshList , setRefreshList]=useState()

    useEffect(()=>{
       if(!getToken()){
     navigate('/login')
       }
       fetchTodoList();
    },[refreshList])
    useEffect(()=>{
    if(searchText === ''){
        setFilteredList(list)
    }
    else{
        const filterlist=list.filter(todo=> todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()) )
        setFilteredList(filterlist)
    }
    },[list,searchText])
    async function fetchTodoList(){
        const result= await getTodoListApi()
        console.log(result)
        if(result.status === 200 && result.data.status === 200){
            setList(result.data.data.todos.reverse())
        }
    }
  return (
    <div>
     <Header searchText={searchText} setSearchText={setSearchText}/>
   <div className='container'>
<div className='row justify-content-md-center mt-4'>
    {
        filteredList.map((todo) =><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>)
    }
    {
        filteredList.length ===0 && <div className='notFoundTodos'>No Todos Found</div>
    }

</div>
   </div>
   <div className='' style={{position : 'fixed', right : 50 ,bottom :50, zIndex : 1030}}>
   <button type='button' data-bs-toggle="modal" data-bs-target="#exampleModal"  className='btn btn-outline-light'>ADD</button>
   </div>
  <AddTodoModal setRefreshList={setRefreshList}/>
    </div>
  )
}

export default Home
