import Home from "./pages/Home";

function App() {
	return (
		<>
			<div className="container mt-3">
				<div className="row">
					<div className="col">
						<h3>Movie Genre App</h3>
					</div>
					<div className="col text-end">
						<a href="#!">
							<span className="badge text-bg-success">Login</span>
						</a>
					</div>
					<hr className="mt-2 mb-3" />
				</div>

				<div className="row">
					<div className="col-md-2">
						<nav>
							<div className="list-group">
								<a
									href="#!"
									className="list-group-item list-group-item-action"
								>Home</a>
								<a
									href="#!"
									className="list-group-item list-group-item-action"
								>Movies</a>
								<a
									href="#!"
									className="list-group-item list-group-item-action"
								>Genres</a>
								<a
									href="#!"
									className="list-group-item list-group-item-action"
								>Add Movie</a>
								<a
									href="#!"
									className="list-group-item list-group-item-action"
								>Manage Catalogue</a>
								<a
									href="#!"
									className="list-group-item list-group-item-action"
								>GraphQL</a>
							</div>
						</nav>
					</div>
					<div className="col-md-10">
						<Home />
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
