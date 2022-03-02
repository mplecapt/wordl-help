import './App.css';
import SuggestionList from './Suggestion';
import SearchForm from './Search';
import { useState } from 'react';

export default function App() {
	let [regx, setRegx] = useState(null);
	let [share, setShare] = useState("");

	return (
		<div className='columns'>
			<div className='inputs'>
				<SearchForm setFilter={setRegx} receiveShare={share} setShare={setShare}/>
			</div>
			<div className='suggestions'>
				<SuggestionList filterBy={regx} setShare={setShare}/>
			</div>
		</div>
	);
}