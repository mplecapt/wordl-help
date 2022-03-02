import './NewApp.css';
import { useState, useEffect } from 'react';
import list from './data/wordlist.json';

export default function App() {
	let [complete, setComplete] = useState([]);
	let [current, setCurrent] = useState();

	function processList() {
		list.entries.forEach(wrd => {
			setComplete(complete => [...complete, {
				word: wrd,
				bits: [
					{result: "00000", value: 50},
				]
			}]);
		})
	}

	useEffect(() => {
		processList();
	}, [])

	return (
		<div className='rows'>
			<Graph data={current} />
			<div className='container'>
				{complete && complete.map((d, i) => {
					if (i > 100) return <></>;	
					return (
						<button
							key={i} 
							onClick={()=>{setCurrent(d)}}
						>{d.word}</button>
					)
				})}
			</div>
		</div>
	);
}

function Graph({ data }) {
	return(
		<div className='graph'>
			{data && (
				<>
					<h3>{data.word}</h3>
					<div className='graph-body'>
						{data.bits && data.bits.map((b, i) => (
							<div key={i} className='data-bar' height={`${b.value}%`}/>
						))}
					</div>
				</>
			)}
		</div>
	);
}