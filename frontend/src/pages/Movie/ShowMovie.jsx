import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ShowMovie = () => {
	const [movie, setMovie] = useState({})
	let { id } = useParams();

	useEffect(() => {
		let demoMovie = {
			id: 1,
			title: "The Shawshank Redemption",
			release_date: "23 Sep 1994",
			runtime: "2h 22m",
			mpaa_rating: "R",
			description: "Two inmates find hope and redemption in prison.",
		};
		setMovie(demoMovie);
	}, [id]);

	return (
		<>
			<div>
				<h4>Movie: {movie.title}</h4>
				<hr />
                <p>Description: {movie.description}</p>
                <p>Runtime: {movie.runtime}</p>
                <p>Release Date: {movie.release_date}</p>
                <p>MPAA Rating: {movie.mpaa_rating}</p>
			</div>
		</>
	);
};

export default ShowMovie;
