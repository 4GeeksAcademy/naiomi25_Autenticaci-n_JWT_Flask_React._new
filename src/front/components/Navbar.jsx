import { Link, useNavigate } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const {store, dispatch }= useGlobalReducer()
	const navigate = useNavigate()
	const loggin = store.loggin

	const handleLoggin = ()=>{

		dispatch({ type: "loggin", payload: false });
		localStorage.removeItem("jwt-token");
		navigate ('/')};


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Inicio</span>
				</Link>

				{!loggin ? (

				<div className="d-grid gap-2 d-md-flex justify-content-md-end">
					<Link to="/signup">
						<button type="button" className="btn btn-outline-warning">Registro</button>
					</Link>
				
					<Link to="/login">
						<button type="button" className="btn btn-outline-success">Logeate</button>
					</Link>

				</div>
				):( 
					<div className="d-grid gap-2 d-md-flex justify-content-md-end">
						<button type="button"className="btn btn-outline-danger " onClick={handleLoggin}>Logout</button>
						 
						
					</div>
				)}
                 

			</div>
		</nav>
	);
};