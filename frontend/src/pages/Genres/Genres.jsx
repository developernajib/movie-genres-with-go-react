import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Genres = () => {
	const [genres, setGenres] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			method: "GET",
			headers: headers,
		};

		fetch(`${import.meta.env.VITE_APP_BACKEND}/genres`, requestOptions)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok");
			})
			.then((data) => {
				setGenres(data);
			})
			.catch((err) => {
				console.log(err);
				setError(err.message);
			});
	}, []);

	if (error !== null) {
		return (
			<div className="alert alert-danger" role="alert">
				Error: {error}
			</div>
		);
	} else {
		return (
			<div>
				<h2>Genres</h2>
				<hr />

				<div className="list-group">
					{genres.map((g) => (
						<Link
							key={g.id}
							className="list-group-item list-group-item-action"
							to={`/genres/${g.id}`}
							state={{
								genreName: g.genre,
							}}
							onClick={(e) => {
								e.preventDefault();
								navigate(`/movies/genre/${g.id}`, {
									state: {
										genreName: g.genre,
									},
								});
							}}
						>
							{g.genre}
						</Link>
					))}
				</div>
			</div>
		);
	}
};

export default Genres;

