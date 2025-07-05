import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
	return (
		<div className="mb-3">
			<label htmlFor={props.name} className="form-label">
				{props.title}
			</label>
			<input
				type={props.type}
				className={`form-control ${props.className}`}
				id={props.name}
				name={props.name}
				placeholder={props.placeholder}
				onChange={props.onChange}
				value={props.value}
				autoComplete={props.autoComplete}
				ref={ref}
			/>
			<div className={props.errorDiv}>{props.errorMsg}</div>
		</div>
	);
});

export default Input;
