import { use } from "react";
import { useState } from "react";
import { signupFetch } from "../../services/apiFetch"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const FormSignup = () => {
  const navigate = useNavigate()
  const [validate, setValidate] = useState(true)
  const [password, setpassword] = useState('')
  const [data, setData] = useState({

    'name': '',
    'email': '',
    'last_name': '',

  })

  const handleEvent = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }



  const handlePassword = (e) => {

    const valor = e.target.value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;

    setpassword(valor);
    setValidate(regex.test(valor));

  }



  const handleSubmit = async (e) => {
    e.preventDefault()

    const data_and_password = {
      ...data,
      password: password

    }


    try {
      const response = await signupFetch(data_and_password)
      console.log('usuario registrado', response)
      navigate('/')
    } catch (error) {
      console.log('hubo un error a la hora en registrar al usuario', error)
    }
  };




  return (
    <div className="card-container "  >
      <div className="card  align-items-center" style={{ width: "70rem" }} >

        <div className="card-header pt-3">
          FORMULARIO DE REGISTRO
        </div>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6 ps-4 ">
            <label htmlFor="validationCustom01" className="form-label">Name</label>
            <input type="text" className="form-control" id="validationCustom01" name='name' value={data.name} onChange={handleEvent} required />

          </div>
          <div className="col-md-6 pe-4 ">
            <label htmlFor="validationCustom02" className="form-label">Last name</label>
            <input type="text" className="form-control" id="validationCustom02" name='last_name' value={data.last_name} onChange={handleEvent} required />

          </div>

          <div className="col-md-6 ps-4">
            <label htmlFor="validationCustom04" className="form-label">Email</label>
            <input type="email" className="form-control" id="validationCustom04" name='email' value={data.email} onChange={handleEvent} required />

          </div>

          <div className="col-md-6 pe-4">
            <label htmlFor="validationCustom05" className="form-label">Password</label>
            <input type="password" className="form-control" id="validationCustom05" value={password} onChange={handlePassword} required />
            <span id="passwordHelpInline" className="form-text text-muted small">
              La contraseña debe tener al menos 6 digitos y contener: mayuscula, minuscula,caracter especial y número.
            </span>
            {!validate && (
              <div className="text-danger">La contraseña no cumple los requisitos</div>
            )}
          </div>


          <div className="col-12 text-center mt-4 pb-3">
            <button className="btn btn-primary  " type='Submit' disabled={!validate} >Submit form</button>
          </div>
        </form>
      </div>
    </div>

  )

}