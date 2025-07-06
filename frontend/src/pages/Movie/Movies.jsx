import { useEffect, useState } from "react";
import { Link } from "react-router";

const Movies = () => {
	const [Movies, setMovies] = useState([]);

	useEffect(() => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			method: "GET",
			headers: headers,
		};

		fetch("http://localhost:8080/movies", requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setMovies(data);
			})
			.catch((error) => {
                console.error(error);
            });
	}, []);
	return (
		<>
			<div>
				<h4 className="text-center">Movies</h4>
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
										<Link to={`/movies/${movie.id}`}>
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

export default Movies;
