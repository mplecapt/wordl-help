import { useField } from "formik";
import React, { Component } from "react";

export class InputButton extends Component {
	constructor(props) {
		super(props);
		this.state = { value: '' };
	}

	handleChange(e) {
		if (e.target.value.length <= 1) {
			this.setState({ value: e.target.value });
		}
		if (e.target.value.length === 1) {
			this.nextComponent.focus();
		}
	}

	render() {
		return (
			<>
				<input type='text' ref={(input) => this.input1 = input} onChange={this.handleTextChange} />
			</>
		);
	}
}

const Style = {
	box: {

	}
}