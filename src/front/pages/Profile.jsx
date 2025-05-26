
import { useState , useEffect } from "react";
import { Profile } from "../../services/apiFetch";
import { useNavigate } from "react-router-dom";


export const ProfileUser =()=>{

    const navigate = useNavigate();

    const [userData,setUserData] = useState(null)


  
  const fetchUser = async () => {
    try {
      const data = await Profile();
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
    <div>
      <p>Bienvenido a tu perfil</p>
      <p>Email: {userData.email}</p>
      <p>Nombre: {userData.name}</p>
    </div>
  );
};