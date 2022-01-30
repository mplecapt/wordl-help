import './Search.css';
import { Component } from "react";

const INIT_STATE = {
	words: [],
};

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.keyInput = this.keyInput.bind(this);
		this.reset = this.reset.bind(this);
		this.changePosState = this.changePosState.bind(this);
		this.handle = this.handle.bind(this);
		this.state = INIT_STATE
	}

	handle(r) {
		this.props.setFilter(r);
	}

	idxFilter = (pos, state) => (
		this.state.words.map((data, i) => (
			(i % 5 === pos && data.posState === state) ? data.letter : null
		)).join('')
	)

	knownFilter(idx) {
		let arr1 = this.idxFilter(idx, 1);
		let arr2 = this.idxFilter(idx, 2);
		return arr1.length > 0
			? `[${arr1}]`
			: arr2.length > 0
			? `[^${arr2}]`
			: '.';
	}

	evaluate() {
		let notInWordArr = this.state.words.map(data => (data.posState === 0 ? data.letter : null)).join('');
		let notInWord = notInWordArr.length > 0 ? `(?!\\b.*[${notInWordArr}].*\\b)` : '';

		let contains = this.state.words.map(data => (data.posState === 2 ? `(?=\\b.*[${data.letter}].*\\b)` : null)).filter(x => x).join('');

		let here = `\\b${this.knownFilter(0) + this.knownFilter(1) + this.knownFilter(2) + this.knownFilter(3) + this.knownFilter(4)}\\b`;

		let reg = new RegExp(notInWord + contains + here, 'gi');
		console.log(reg);
		this.handle(reg);
	}

	changePosState(i) {
		this.setState(state => ({ 
			words: state.words.map((item, j) => (
				(j === i) ? { letter: item.letter, posState: ((item.posState === 2) ? 0 : item.posState + 1) } : item )
			)
		}));
	}

	keyInput(value) {
		switch (value) {
			case 'Enter': 
				this.evaluate();
				break;
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
	}

	reset() {
		this.setState(INIT_STATE);
		this.handle(null);
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