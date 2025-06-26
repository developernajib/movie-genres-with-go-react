import Ticket from "@/assets/images/movie_tickets.jpg";
const Home = () => {
	return (
		<>
			<div className="text-center">
				<h4>Find a movie</h4>
				<hr />
				<img src={Ticket} alt="Default Ticket" />
			</div>
		</>
	);
};

export default Home;
