import './App.css';
import Basic from './Basic';
import SuggestionList from './Suggestion';

function App() {
	return (
		<div style={{display: 'flex', flexDirection: 'row'}}>
			<div style={{width: '50%'}}>
				<SuggestionList />
			</div>
			<div style={{width: '50%'}}>
				
			</div>
		</div>
	);
}

export default App;



/*






*notes*
-show frequency of letters according to filter
-show which word has the highest frequency score
-bigger dictionary
-reset button
-better handling for double lettered words


-overhaul input

Wordle style letter boxes with a plus symbol. add a letter to a position
each letter adds a box below, so each letter has it's own box, which then has flags to mark as notInWord, notThisPos, thisPos, or remove
regex would be built per letter position

`(?!\b\w*[^${notInWord}]\w*\b)`

`(?=\b
${`[${notThisPos[1-4]}]|.` || `.`}
${`[${notThisPos[0,2-4]}]|.` || `.`}
${`[${notThisPos[0-1,3-4]}]|.` || `.`}
${`[${notThisPos[0-2,4]}]|.` || `.`}
${`[${notThisPos[0-3]}]|.` || `.`}
\b)`

`\b
${(`${thisPos[0]}` || `[^${notThisPos[0]}]` || `.`)}
${(`${thisPos[1]}` || `[^${notThisPos[1]}]` || `.`)}
${(`${thisPos[2]}` || `[^${notThisPos[2]}]` || `.`)}
${(`${thisPos[3]}` || `[^${notThisPos[3]}]` || `.`)}
${(`${thisPos[4]}` || `[^${notThisPos[4]}]` || `.`)}
\b`

*/