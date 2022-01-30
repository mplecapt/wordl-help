import './App.css';
import SuggestionList from './Suggestion';
import SearchForm from './Search';
import { useState } from 'react';

export default function App() {
	let [regx, setRegx] = useState(null);

	return (
		<div className='columns'>
			<div className='inputs'>
				<SearchForm setFilter={setRegx} />
			</div>
			<div className='suggestions'>
				<SuggestionList filterBy={regx} />
			</div>
		</div>
	);
}