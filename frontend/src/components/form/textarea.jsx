const Textarea = (props) => {
	return (
		<div className="mb-3">
			<label htmlFor={props.name} className="form-label">
				{props.title}
			</label>
			<textarea
				name={props.name}
				id={props.name}
				className={`form-control ${props.className}`}
				rows={props.rows}
				onChange={props.onChange}
				value={props.value}
			/>
			<div className={props.errorDiv}>{props.errorMsg}</div>
		</div>
	);
};

export default Textarea;
