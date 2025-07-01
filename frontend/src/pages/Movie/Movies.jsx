import { useEffect, useState } from "react";
import { Link } from "react-router";

const Movies = () => {
    const [Movies, setMovies] = useState([]);

    useEffect(() => {
        let moviesList = [
            {
                id: 1,
                title: "The Shawshank Redemption",
                release_date: "23 Sep 1994",
                runtime: "2h 22m",
                mpaa_rating: "R",
                description: "Two inmates find hope and redemption in prison.",
            },
            {
                id: 2,
                title: "The Godfather",
                release_date: "15 Mar 1972",
                runtime: "3h 28m",
                mpaa_rating: "R",
                description: "Crime dynasty patriarch passes control to his son.",
            },
            {
                id: 3,
                title: "The Dark Knight",
                release_date: "18 Jul 2008",
                runtime: "2h 32m",
                mpaa_rating: "PG-13",
                description: "Batman battles the Joker in Gotham City.",
            },
            {
                id: 4,
                title: "The Godfather: Part II",
                release_date: "12 Dec 1974",
                runtime: "3h 20m",
                mpaa_rating: "R",
                description: "Vito Corleone's rise to power in organized crime.",
            },
            {
                id: 5,
                title: "12 Angry Men",
                release_date: "10 Apr 1957",
                runtime: "1h 36m",
                mpaa_rating: "NR",
                description: "Juror challenges the majority in a murder trial.",
            }
        ]

        setMovies(moviesList);
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
                                <tr>
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
