//import { wordlist } from './wordlist';
import dictionary from './dictionary.json'

export default function SuggestionList({ filterBy, ...props }) {
	if (filterBy === undefined) filterBy = /.*/;

	return (
		<div style={Style.container}>
			{dictionary.filter(word => filterBy.test(word)).map((filteredWord, idx) => (
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