import Ticket from "@/assets/images/movie_tickets.jpg";
import { Link } from "react-router";
const Home = () => {
	return (
		<>
			<div className="text-center">
				<h4>Find a movie</h4>
				<hr />
                <Link to="/movies">
				    <img src={Ticket} alt="Default Ticket" />
                </Link>
			</div>
		</>
	);
};

export default Home;
