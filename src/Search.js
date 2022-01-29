import './Search.css';
import { Component } from "react";

const INIT_STATE = {
	words: [],
	regx: null,
};

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.keyInput = this.keyInput.bind(this);
		this.reset = this.reset.bind(this);
		this.changePosState = this.changePosState.bind(this);
		this.state = INIT_STATE
	}

	evaluate() {
		let notInWord = `(?!\\b.*[^${this.state.words.filter(data => (data.posState === 0 ? data.letter : null)).join('')}].*\\b)`
		let notHere = `(?=\\b[${this.state.words.filter((data, i) => (i % 5 === 0 && data.posState === 2 ? data.letter : null)).join('') || '.'}][${this.state.words.filter((data, i) => (i % 5 === 1 && data.posState === 2 ? data.letter : null)).join('') || '.'}][${this.state.words.filter((data, i) => (i % 5 === 2 && data.posState === 2 ? data.letter : null)).join('') || '.'}][${this.state.words.filter((data, i) => (i % 5 === 3 && data.posState === 2 ? data.letter : null)).join('') || '.'}][${this.state.words.filter((data, i) => (i % 5 === 4 && data.posState === 2 ? data.letter : null)).join('') || '.'}]\\b)`;
		console.log(notHere);
	}

	changePosState(i) {
		this.setState(state => {
			const words = state.words.map((item, j) => {
				if (j === i) {
					const newState = (item.posState === 2) ? 0 : item.posState + 1;
					return { 
						letter: item.letter, 
						posState: newState,
					}
				} else {
					return item;
				}
			});

			return {
				words,
			};
		});
		this.evaluate();
	}

	keyInput(value) {
		switch (value) {
			case 'Enter': break;
			case '<-':
				if (this.state.words.length === 0) break;
				this.setState({
					words: this.state.words.filter((letter, idx) => (
						idx !== this.state.words.length - 1
					))
				});
				break;
			default:
				if (this.state.words.length >= 30) break;
				this.setState(state => {
					const words = state.words.concat({letter: value, posState: 0});
					return {
						words
					}
				});
		}
		this.evaluate();
	}

	reset() {
		this.setState(INIT_STATE);
	}

	render() {
		return (
			<>
				<div className='search content'>
					<div className='word'>
						{(this.state.words || []).map((data, idx) => (
							<span className='letter clickable' key={idx}
								onClick={() => {this.changePosState(idx)}}
								style={data.posState === 1
									? { backgroundColor: '#4d5' }
									: data.posState === 2
									? { backgroundColor: '#dd4' }
									: null
								}
							>
								{data.letter}
							</span>
						))}
						{Array.from(Array(30 - this.state.words.length)).map((l, i) => (
							<span className='letter' key={i}></span>
						))}
					</div>
				</div>
				<div className='keyboard content'>
					<Keyboard handler={this.keyInput} />
				</div>
				<span className='reset' onClick={this.reset}>Reset</span>
			</>
		);
	}
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