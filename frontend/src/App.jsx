import { Link, Outlet } from "react-router";
import { useEffect, useState } from "react";
import Alert from "@/components/form/alert";
import { useNavigate } from "react-router";

function App() {
	const [jwtToken, setJwtToken] = useState("");
	const [alertMessage, setAlertMessage] = useState("");
	const [alertClassName, setAlertClassName] = useState("d-none");
	const navigator = useNavigate();
	const [ticking, setTicking] = useState(false);
	const [tickInterval, setTickInterval] = useState();

	const logOut = () => {
		const requestOptions = {
			method: "GET",
			credentials: "include",
		};

		fetch(`${import.meta.env.VITE_APP_BACKEND}/logout`, requestOptions)
			.catch((error) => {
				console.error("Error logging out: ", error.message);
			})
			.finally(() => {
				setJwtToken("");
			});

		navigator("/login");
	};

	const toggleRefresh = () => {
		if (ticking) {
			clearInterval(tickInterval);
			setTicking(false);
		} else {
			const tick = () => {
				logOut();
			};
			setTickInterval(setInterval(tick, 1000));
			setTicking(true);
		}
	};

	useEffect(() => {
		if (jwtToken === "") {
			const requestOptions = {
				method: "GET",
				credentials: "include",
			};

			fetch(`${import.meta.env.VITE_APP_BACKEND}/refresh`, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					if (data.access_token) {
						setJwtToken(data.access_token);
					}
				})
				.catch((error) => {
					console.error(
						"No valid refresh token available:",
						error.message
					);
				});
		}
	}, [jwtToken]);

	return (
		<>
			<div className="container mt-3">
				<div className="row">
					<div className="col">
						<h3>
							<Link
								style={{
									color: "black",
									textDecoration: "none",
								}}
								to="/"
							>
								Movie Genre App
							</Link>
						</h3>
					</div>
					<div className="col text-end">
						{jwtToken === "" ? (
							<Link to="/login">
								<span className="badge text-bg-success">
									Login
								</span>
							</Link>
						) : (
							<a href="#!" onClick={logOut}>
								<span className="badge text-bg-danger">
									Logout
								</span>
							</a>
						)}
					</div>
					<hr className="mt-2 mb-3" />
				</div>

				<div className="row">
					<div className="col-md-2">
						<nav>
							<div className="list-group">
								<Link
									to="/"
									className="list-group-item list-group-item-action"
								>
									Home
								</Link>
								<Link
									to="/movies"
									className="list-group-item list-group-item-action"
								>
									Movies
								</Link>
								<Link
									to="/genres"
									className="list-group-item list-group-item-action"
								>
									Genres
								</Link>
								{jwtToken !== "" ? (
									<>
										<Link
											to="/admin/movie/0"
											className="list-group-item list-group-item-action"
										>
											Add Movie
										</Link>
										<Link
											to="/catalogue"
											className="list-group-item list-group-item-action"
										>
											Manage Catalogue
										</Link>
										<Link
											to="/graphql"
											className="list-group-item list-group-item-action"
										>
											GraphQL
										</Link>
									</>
								) : (
									""
								)}
							</div>
						</nav>
					</div>
					<div className="col-md-10">
						<Alert
							message={alertMessage}
							className={alertClassName}
						/>
						<Outlet
							context={{
								jwtToken,
								setJwtToken,
								setAlertMessage,
								setAlertClassName,
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
