import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

const OneGenre = () => {
	const location = useLocation();
	const { genreName } = location.state;

	const [movies, setMovies] = useState([]);

	let { id } = useParams();

	useEffect(() => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			method: "GET",
			headers: headers,
		};

		fetch(`${import.meta.env.VITE_APP_BACKEND}/movies/genre/${id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (data.error) {
					console.log(data.message);
				} else {
					setMovies(data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id]);

	return (
		<>
			<h2>Genre: {genreName}</h2>

			<hr />

			{movies ? (
				<table className="table table-striped table-hover">
					<thead>
						<tr>
							<th>Movie</th>
							<th>Release Date</th>
							<th>Rating</th>
						</tr>
					</thead>
					<tbody>
						{movies.map((m) => (
							<tr key={m.id}>
								<td>
									<Link to={`/movie/${m.id}`}>{m.title}</Link>
								</td>
								<td>
									{new Date(
										m.release_date
									).toLocaleDateString()}
								</td>
								<td>{m.mpaa_rating}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No movies in this genre (yet)!</p>
			)}
		</>
	);
};

export default OneGenre;
