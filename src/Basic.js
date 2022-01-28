import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { wordlist as dict } from './wordlist';

function check(val, msg) {
	return (val && val.length > 0) ? msg : '';
}

export default function Basic() {
	let [regx, setRegx] = useState(new RegExp(''));

	return (
		<div className="App">
			<Formik
				initialValues={{
					notInWord: '',
					somewhere: '',
					known: ['', '', '', '', ''],
					butNotHere: ['', '', '', '', ''],
				}}
				validate={(values) => {
					let notContain = check(values.notInWord, `(?!\\b\\w*[${values.notInWord}]\\w*\\b)`);
					let sumwhere = check(values.somewhere, values.somewhere.split("").map(n => `(?=\\b\\w*${n}\\w*\\b)`).join(""));
					let knownPos = ['', '', '', '', ''];
					for (let i = 0; i < 5; i++) {
						knownPos[i] = values.known[i] || (values.butNotHere[i] && `[^${values.butNotHere[i]}]`) || `\\w`;
					}
					
					let tmp = `${notContain}${sumwhere}\\b${knownPos.join("")}\\b`;
					//console.log(tmp);
					setRegx(new RegExp(tmp));
				}}
			>
				<Form>
					<label htmlFor='notInWord'>Letters not in word </label>
					<Field name='notInWord' /><br/>
					<label htmlFor='somewhere'>Unkown positions </label>
					<Field name='somewhere' /><br/>
					<div>
						<label htmlFor='known'>Known positions</label>
						<Field type='text' style={{width: '20px'}} name={'known[0]'} />
						<Field type='text' style={{width: '20px'}} name={'known[1]'} />
						<Field type='text' style={{width: '20px'}} name={'known[2]'} />
						<Field type='text' style={{width: '20px'}} name={'known[3]'} />
						<Field type='text' style={{width: '20px'}} name={'known[4]'} />
					</div>
					<div>
						<label htmlFor='butNotHere'>Not these positions</label>
						<Field type='text' style={{width: '20px'}} name={'butNotHere[0]'} />
						<Field type='text' style={{width: '20px'}} name={'butNotHere[1]'} />
						<Field type='text' style={{width: '20px'}} name={'butNotHere[2]'} />
						<Field type='text' style={{width: '20px'}} name={'butNotHere[3]'} />
						<Field type='text' style={{width: '20px'}} name={'butNotHere[4]'} />
					</div>
					<div>
						{dict.filter(word => regx.test(word)).map((filteredWord, idx) => (
							<li key={idx}>
								{filteredWord}
							</li>
						))}
					</div>
				</Form>
			</Formik>
		</div>
	)
}