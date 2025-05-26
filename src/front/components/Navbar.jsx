import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="d-grid gap-2 d-md-flex justify-content-md-end">
					<Link to="/signup">
						<button type="button" className="btn btn-outline-warning">Registro</button>
					</Link>
				
					<Link to="/login">
						<button type="button" className="btn btn-outline-success">Logeate</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};