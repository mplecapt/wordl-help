import './Search.css';
import { Component } from "react";

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.keyInput = this.keyInput.bind(this);
	}

	keyInput(value) {

	}

	render() {
		return (
			<>
				<div className='search content'>
					
				</div>
				<div className='keyboard content'>
					<Keyboard handler={this.keyInput} />
				</div>
			</>
		);
	}
}

function Display() {
	return (
		<>
		</>
	);
}

function Keyboard({ handler }) {
	return (
		<div className='keyboard'>
			{buttons.map((btn) => {
				const st = (btn === 'Enter') ? {
					padding: '15px 10px 15px 10px', 
					fontWeight: 'normal'
				} : null;
				return (
					<span key={btn} 
						onClick={()=>{handler(btn)}}
						className='key' style={st}
					>{btn}</span>
				);
			})}
		</div>
	);
}

const buttons = [
	'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
	'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
	'Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<-'
];