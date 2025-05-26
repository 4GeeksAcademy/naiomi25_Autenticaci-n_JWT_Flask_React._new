

const backendUrl = import.meta.env.VITE_BACKEND_URL


export const SignupFetch = async (datos) => {
  try {
    const response = await fetch(backendUrl + "/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      throw new Error("hubo un problema al enviar los datos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en el fetch:", error);
    throw error;
    
    
  }
};
export const LoginFetch = async (usuario) => {
 
  try{
    const response = await fetch(backendUrl + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });


    if (!response.ok)
      throw new Error ( 'hubo un error en la petición')

    const data =await response.json()
      if (data.token) {
      localStorage.setItem("jwt-token", data.token);
    } else {
      console.error("No se recibió token en la respuesta");
    }
    return data
  }
  catch(error){
   console.error('hubo un error',error)
   throw error;
  }
}

export const Profile = async ( ) =>{
   const token = localStorage.getItem('jwt-token');
   console.log("Token enviado:", token);
   try{
    const response = await fetch (backendUrl + "/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        
      });

    
      if (!response.ok){
        throw new Error ( 'error en la peticion')
      }
      const data = await response.json()
      return data

    }catch(error){
  console.error('error interno',error)

}
}