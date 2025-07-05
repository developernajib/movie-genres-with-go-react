const Alert = (props) => {
	const alertClass = `alert ${
		props.className === "d-none"
			? "d-none"
			: `alert-${props.className} alert-dismissible fade show`
	}`;

	return (
		<div className={alertClass} role="alert">
			<strong>{props.message}</strong>
			<button
				type="button"
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
			></button>
		</div>
	);
};

export default Alert;
