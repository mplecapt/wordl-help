//import dictionary from './data/dictionary.json'
import stats from './data/Stats.json'

export default function SuggestionList({ filterBy }) {
	if (filterBy === null || filterBy === undefined) filterBy = /.*/;

	return (
		<div style={Style.container}>
			{stats.Words.filter(data => filterBy.test(data.Word)).map((filteredData, idx) => (
				<span key={idx} style={Style.item}>
					{filteredData.Word}
				</span>
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
	},
}