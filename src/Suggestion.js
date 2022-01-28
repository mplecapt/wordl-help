import { wordlist } from './wordlist';

export default function SuggestionList({ filterBy, ...props }) {
	if (filterBy === undefined) filterBy = /.*/;

	return (
		<div style={Style.container}>
			{wordlist.filter(word => filterBy.test(word)).map((filteredWord, idx) => (
				<span style={{margin: '5px'}} key={idx}>{filteredWord}</span>
			))}
		</div>
	)
}

const Style = {
	container: {
		backgroundColor: 'gray', 
		display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
		overflow: 'auto', justifyContent: 'space-around',
		fontFamily: 'Courier New, monospace',
	}
}