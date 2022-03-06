//import dictionary from './data/dictionary.json'
//import stats from './data/Stats.json'
import { Component } from 'react';
import scores from './data/score.json'
import './Search.css'

export default class SuggestionList extends Component {
	constructor(props) {
		super(props)
		scores.sort((a,b) => a.score < b.score ? 1 : -1);
	}

	render() {
		var filterby = (this.props.filterBy === null || this.props.filterBy === undefined) ? /.*/ : this.props.filterBy;

		return (
			<div className="container">
				{scores.filter(data => filterby.test(data.word)).map((filteredData, idx) => (
					<span key={idx} className="item" onClick={()=>{this.props.setShare(filteredData.word)}}>
						{filteredData.word}	
					</span>
				))}
			</div>
		)
	}
}