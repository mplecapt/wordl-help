import './Search.css';
import { Component, useCallback, useEffect } from "react";

const INIT_STATE = {
	words: [],
};

const LetterState = {
	ABSENT:  0,
	PRESENT: 1,
	CORRECT: 2,
}

export default class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.keyInput = this.keyInput.bind(this);
		this.reset = this.reset.bind(this);
		this.changePosState = this.changePosState.bind(this);
		this.handle = this.handle.bind(this);
		this.state = INIT_STATE
	}

	componentDidUpdate() {
		if (this.props.receiveShare !== "") {
			for (var i = 0; i < this.props.receiveShare.length; i++) {
				this.keyInput(this.props.receiveShare.charAt(i))
			}
			this.props.setShare("");
		}
	}

	handle(r) {
		this.props.setFilter(r);
	}

	evaluate() {
		let absentArr = [];
		let presentArr = ["", "", "", "", ""];
		let correctArr = ["", "", "", "", ""];
		this.state.words.forEach((data, idx) => {
			switch(data.posState) {
				case LetterState.ABSENT:
					// ignore if defined earlier
					if (
						correctArr.includes(data.letter) ||
						absentArr.includes(data.letter)
					) break;

					// special check for present
					if (presentArr.filter(str => (
						str !== "" &&
						str.includes(data.letter)
					)).length > 0) break;

					absentArr.push(data.letter); 
					break;
				case LetterState.PRESENT:
					// remove from absentArr if doubles exist
					var check = absentArr.indexOf(data.letter)
					if (check > -1) absentArr.splice(check, 1)

					presentArr[idx%5] += data.letter;
					break;
				case LetterState.CORRECT:
					if (correctArr[idx%5] !== "" && correctArr[idx%5] !== data.letter) {
						alert("Invalid input: two letters cannot be correct in the same position")
					}

					// remove from absentArr if doubles exist
					check = absentArr.indexOf(data.letter)
					if (check > -1) absentArr.splice(check, 1)
					
					correctArr[idx%5] = data.letter;
					break;
				default:
					console.log("Invalid state for letter: ", data);
			}
		});

		let absent = absentArr.length > 0 ? `(?!\\b.*[${absentArr.join("")}].*\\b)` : '';
		let present = presentArr.length > 0 ? presentArr.map(l => (l !== "" ? `(?=\\b.*${l}.*\\b)` : "")).join("") : ""
		let correct = "\\b"
		for (var i = 0; i < 5; i++) {
			correct += (correctArr[i] !== "")
				? `[${correctArr[i]}]`
				: (presentArr[i] !== "")
					? `[^${presentArr[i]}]`
					: '.';
		}
		correct += "\\b"

		let reg = new RegExp(absent + present + correct, 'gi');
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
			case 'Escape':
				if (this.state.words.length === 0) break;
				var len = this.state.words.length;
				if (len % 5 !== 0)
					this.setState({
						words: this.state.words.filter((letter, idx) => (
							idx < len - (len % 5)
						))
					})
				else
					this.setState({
						words: this.state.words.filter((letter, idx) => (
							idx < len - 5
						))
					})
				break;
			default:
				if (this.state.words.length >= 30) break;
				this.setState(state => {
					const words = state.words.concat({letter: value.toUpperCase(), posState: LetterState.ABSENT});
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
								style={data.posState === LetterState.CORRECT
									? { backgroundColor: '#4d5' }
									: data.posState === LetterState.PRESENT
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
	const handleKeypress = useCallback(event => {
		const { key, keyCode } = event;
		console.log(`${key} | ${keyCode}`)
		switch(keyCode) {
			case 8: handler("<-"); break;
			case 13: handler("Enter"); break;
			case 27: handler("Escape"); break;
			default:
				if (keyCode >= 65 && keyCode <= 90)
					handler(key);
		}
	}, [handler]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeypress);
		return () => {
			document.removeEventListener("keydown", handleKeypress);
		};
	}, [handleKeypress]);

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