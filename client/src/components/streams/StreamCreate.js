import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions/index";

class StreamCreate extends Component {
	//Displays error message if user doesn't enter title or description
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	//Helper function for renderForm
	//Passed down to Field Component
	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				{/* Spread operator takes all formProps and adds them as properties to input element */}
				<input {...input} />
				{/* Connects to validate function for form input */}
				{this.renderError(meta)}
			</div>
		);
	};

	//Function for form onSubmit
	//handleSubmit is default function provided by redux form
	//Eliminates the need to call event preventDefault()
	onSubmit = formValues => {
		this.props.createStream(formValues);
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error"
			>
				<Field name="title" component={this.renderInput} label="Enter Title" />
				<Field
					name="description"
					component={this.renderInput}
					label="Enter Description"
				/>
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

//Validates all form inputs
//Wire up validate to redux form, pass as a key to export statement
const validate = formValues => {
	const errors = {};

	//error properties have identical name to names provided in field property
	if (!formValues.title) {
		errors.title = "Please Enter A Title";
	}

	if (!formValues.description) {
		errors.description = "Please Enter A Description";
	}

	return errors;
};

//Combing connect function and redux-form
const formWrapped = reduxForm({
	form: "streamCreate",
	validate: validate
})(StreamCreate);

export default connect(
	null,
	{ createStream }
)(formWrapped);
