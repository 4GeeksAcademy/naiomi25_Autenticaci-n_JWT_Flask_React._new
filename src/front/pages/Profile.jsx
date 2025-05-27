
import { useState , useEffect } from "react";
import { profileFetch } from "../../services/apiFetch";
import { useNavigate } from "react-router-dom";


export const ProfileUser =()=>{

    const navigate = useNavigate();

    const [userData,setUserData] = useState(null)


  
  const fetchUser = async () => {
    try {
      const data = await profileFetch();
      if (!data) {
        navigate("/login");
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.error("Error al cargar el perfil", error);
    }
    } 

useEffect(() => {
   fetchUser()
}, [])


   return (
    <div className= ' d-flex justify-content-center  aling-items-center'>
     
      <img  src='https://img.freepik.com/vector-premium/banner-bienvenida-vector-dibujos-animados-e-icono-pagina-bienvenida-diseno-pagina-bienvenida_678696-155.jpg'/>
    </div>
  );
};