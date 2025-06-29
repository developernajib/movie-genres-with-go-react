import { Link, Outlet } from "react-router";

function App() {
	return (
		<>
			<div className="container mt-3">
				<div className="row">
					<div className="col">
						<h3>Movie Genre App</h3>
					</div>
					<div className="col text-end">
						<Link to="/link">
							<span className="badge text-bg-success">Login</span>
						</Link>
					</div>
					<hr className="mt-2 mb-3" />
				</div>

				<div className="row">
					<div className="col-md-2">
						<nav>
							<div className="list-group">
								<Link
									to="/"
									className="list-group-item list-group-item-action"
								>
									Home
								</Link>
								<Link
									to="/movies"
									className="list-group-item list-group-item-action"
								>
									Movies
								</Link>
								<Link
									to="/genres"
									className="list-group-item list-group-item-action"
								>
									Genres
								</Link>
								<Link
									to="/admin/movie/0"
									className="list-group-item list-group-item-action"
								>
									Add Movie
								</Link>
								<Link
									to="admin"
									className="list-group-item list-group-item-action"
								>
									Manage Catalogue
								</Link>
								<Link
									to="/graphql"
									className="list-group-item list-group-item-action"
								>
									GraphQL
								</Link>
							</div>
						</nav>
					</div>
					<div className="col-md-10">
						<Outlet />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
