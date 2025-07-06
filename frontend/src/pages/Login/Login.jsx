import Input from "@/components/form/input";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setJwtToken, setAlertMessage, setAlertClassName } =
		useOutletContext();

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		let payload = { email, password };
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			body: JSON.stringify(payload),
		};

		fetch("http://localhost:8080/authenticate", requestOptions)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				if (data.error) {
					setAlertMessage(data.message);
					setAlertClassName("danger");
				} else {
					setJwtToken(data.access_token);
					setAlertClassName("");
					setAlertMessage("");
					navigate("/");
				}
			})
			.catch((error) => {
				setAlertMessage(error.message);
				setAlertClassName("danger");
			});
	};

	return (
		<>
			<div className="col-md-6 offset-md-3">
				<h4>Login</h4>
				<hr />

				<form onSubmit={handleSubmit}>
					<Input
						title="Email Address"
						type="email"
						className="form-control"
						name="email"
						autoComplete="email-new"
						onChange={(event) => setEmail(event.target.value)}
						value={email}
						errorDiv=""
						errorMsg=""
					/>
					<Input
						title="Password"
						type="password"
						className="form-control"
						name="password"
						autoComplete="password-new"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
						errorDiv=""
						errorMsg=""
					/>
					<input
						type="submit"
						className="btn btn-primary"
						value="Login"
					/>
				</form>
			</div>
		</>
	);
};

export default Login;
