import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginFetch } from "../../services/apiFetch"
export const Login =() => {

    const navigate = useNavigate()
    const[ email,setEmail] = useState('')
    const [password,setpassword] = useState('')


const handleEvent = (e) => {

  const {name,value} = e.target

  if( name == 'email') setEmail(value)
  if (name == 'password') setpassword(value)





}
const handleSubmit = async (e)=>{
  e.preventDefault()

const data_login = {
  password : password,
  email : email
  }  

  try{
    const response = await LoginFetch (data_login)
    console.log ( 'login reealizado correctamente',response)
    navigate ('/profile')

 }catch (error) {
      console.log('hubo un error a la hora en registrar al usuario', error)
    }
}
return(

  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1"name = 'email' value = {email} onChange={handleEvent} aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" value = {password}  name = 'password'onChange={handleEvent}  id="exampleInputPassword1"/>
    </div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
)
}