//import dictionary from './data/dictionary.json'
import stats from './data/Stats.json'
import './Search.css'

export default function SuggestionList({ filterBy, setShare }) {
	if (filterBy === null || filterBy === undefined) filterBy = /.*/;

	return (
		<div className="container">
			{stats.Words.filter(data => filterBy.test(data.Word)).map((filteredData, idx) => (
				<span key={idx} className="item" onClick={()=>{setShare(filteredData.Word)}}>
					{filteredData.Word}
				</span>
			))}
		</div>
	)
}