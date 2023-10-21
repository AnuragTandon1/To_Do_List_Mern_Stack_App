import React ,{useState , useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
function Header({searchText , setSearchText}) {
    const navigate =useNavigate()
    const [user , setUser]=useState(null)
   

      useEffect(()=>{
       const u=localStorage.getItem('user')
       setUser(u)
      },[])
    const handleLogout=()=>{
        // localStorage.clear()
        localStorage.removeItem('user')
        navigate('/login')

    }
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">TODO APP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarColor03">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link active" href="/">Home
            <span className="visually-hidden">(current)</span>
          </a>
        </li>
        {
            !user && <li className="nav-item">
            <a className="nav-link" href="login">Login</a>
          </li>
        }
       {
        !user && <li className="nav-item">
        <a className="nav-link" href="register">Register</a>
      </li>
       }
        
        {
            user && <li className="nav-item" style={{cursor : 'pointer'}}>
            <a className="nav-link" onClick={handleLogout}>Logout</a>
          </li>
        }
        
        <li className="nav-item dropdown">
       
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider" />
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li>
      </ul>
      {
        user && <form className="d-flex" >
        <input className="form-control me-sm-2" type="search"  placeholder="Search" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
        <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
      }
      
    </div>
  </div>
</nav>

  )
}

export default Header
