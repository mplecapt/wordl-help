import { wordlist } from './wordlist';

export default function SuggestionList({ filterBy }) {
	if (filterBy === null) filterBy = /.*/;

	return (
		<div style={Style.container}>
			{wordlist.filter(word => filterBy.test(word)).map((filteredWord, idx) => (
				<span style={Style.item} key={idx}>{filteredWord}</span>
			))}
		</div>
	)
}

const Style = {
	container: {
		border: '2px dashed #bbb',
		borderRadius: '10px', 
		padding: '5px',
		margin: '2vh 3vh 2vh 2vh',
		display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
		overflow: 'auto', justifyContent: 'space-around',
		fontFamily: 'Lucida Console, monospace', fontWeight: 'bold',
	},
	item: {
		margin: '5px',
	}
}