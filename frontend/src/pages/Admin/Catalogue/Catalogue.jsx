import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router";

const Catalogue = () => {
	const [Movies, setMovies] = useState([]);
	const { jwtToken } = useOutletContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (jwtToken === "") {
			navigate("/login");
			return;
		}
		const headers = new Headers();
		headers.append("Content-Type", "application/json");
		headers.append("Authorization", "Bearer " + jwtToken);

		const requestOptions = {
			method: "GET",
			headers: headers,
		};

		fetch("http://localhost:8080/admin/movies", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setMovies(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [jwtToken]);
	return (
		<>
			<div>
				<h4 className="text-center">Manage Catalogue</h4>
				<hr />

				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Release Date</th>
							<th scope="col">Runtime</th>
							<th scope="col">MPAA Rating</th>
							<th scope="col">Description</th>
						</tr>
					</thead>
					<tbody>
						{Movies.map((movie) => {
							return (
								<tr key={movie.id}>
									<td>
										<Link to={`/admin/movie/${movie.id}`}>
											{movie.title}
										</Link>
									</td>
									<td>{movie.release_date}</td>
									<td>{movie.runtime}</td>
									<td>{movie.mpaa_rating}</td>
									<td>{movie.description}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default Catalogue;
