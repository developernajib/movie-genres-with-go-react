import { useRouteError } from "react-router";

const Error = () => {
	const error = useRouteError();
	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="text-center">
				<h3>Oops, something went wrong!</h3>
				<p>
					Please try again later or contact our support team
					if the issue persists.
				</p>
				<small>
					<em>{error.statusText || error.message}</em>
				</small>
			</div>
		</div>
	);
};

export default Error;
