import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ShowMovie = () => {
	const [movie, setMovie] = useState([]);
    const { id } = useParams();

	useEffect(() => {
		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const requestOptions = {
			method: "GET",
			headers: headers,
		};

		fetch(`http://localhost:8080/movie/${id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setMovie(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [id]);

	if (movie.genres) {
		movie.genres = Object.values(movie.genres);
	} else {
		movie.genres = [];
	}

	return (
		<>
			<div>
				<h4 className="text-center">Movies</h4>
				<hr />
				<h5>{movie.title}</h5>
				<small>
					<em>
						{movie.release_date}, {movie.runtime} minutes, Rated{" "}
						{movie.mpaa_rating}
					</em>
				</small>
                <br />

				{movie.genres.map((genre) => (
                    <span key={genre.id} className="badge bg-primary me-2">{genre.genre}</span>
                ))}
                <hr />

                {movie.image !== "" &&
                    <div className="mb-3">
                        <img src={`http://image.tmdb.org/t/p/w200/${movie.image}`} alt="Movie Poster" />
                    </div>
                }
				<p>Description: {movie.description}</p>
			</div>
		</>
	);
};

export default ShowMovie;
