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
		console.log("Email:", email, "Password:", password);

		if (email === "admin@example.com") {
			setJwtToken(
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwic3ViZCI6IjEyMzQ1Njc4OTAiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
			);
			setAlertMessage("Login successful!");
			setAlertClassName("success");
			navigate("/");
		} else {
			setAlertMessage("Invalid email or password!");
			setAlertClassName("danger");
		}
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
