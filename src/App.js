import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(){
		super();
		this.state = {
			valueIn: 0,
			valA: 0,
			opSelect: null,
			list: []
		}
	}

	show(valueB){
	
		let valueIn = this.state.valueIn;
		let valA = this.state.valA; 
		let opSelect = this.state.opSelect;
		let list = this.state.list;
		let resHist;
		const btOp = ['+','-','*','/','='];

		if(valueB === 'C'){
			valueIn = 0;
			valA = 0;
			opSelect = null;
			list.push('*Clear*');
			btOp.map((opr => {
				document.getElementById(opr).style.backgroundColor = 'rgb(233, 133, 19)';
				document.getElementById(opr).style.border = 'none';
			}));
		}
		if(typeof valueB === 'number' || valueB === '.'){
			if(valueIn === 0){
				valueIn = valueB;
			}
			else{
				valueIn = valueIn + valueB.toString();
			}
		}


		if(valueB === '+' || valueB === '-' || valueB === '*' || valueB === '/' || valueB === '='){

			if(valueIn !== 0 && valA === 0){
				valA = valueIn;
				valueIn = 0;
				opSelect = valueB;
			}

			btOp.map((opr => {
				if(opr === valueB){
					document.getElementById(valueB).style.backgroundColor = "rgb(151, 87, 13)";
					document.getElementById(valueB).style.border = '1.5px solid black';
				}
				else{
					document.getElementById(opr).style.backgroundColor = "rgb(233, 133, 19)";
					document.getElementById(opr).style.border = 'none';
				}

				if(opr === '='){
					document.getElementById(opr).style.backgroundColor = "rgb(233, 133, 19)";
					document.getElementById(opr).style.border = 'none';
				}
			}));

			if(valueIn !== 0 && valA !== 0){
				
				if(this.state.opSelect === '+'){
					resHist = parseFloat(valA, 10) +(this.state.opSelect)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) + parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelect = valueB;
				}
				if(this.state.opSelect === '-'){
					resHist = parseFloat(valA, 10) +(this.state.opSelect)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) - parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelect = valueB;
				}
				if(this.state.opSelect === '*'){
					resHist = parseFloat(valA, 10) +(this.state.opSelect)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) * parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelect = valueB;
				}
				if(this.state.opSelect === '/'){
					resHist = parseFloat(valA, 10) +(this.state.opSelect)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) / parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelect = valueB;
				}
				if(opSelect === '='){
					valueIn = parseFloat(parseFloat(valA, 10) +(this.state.opSelect)+ parseFloat(valueIn, 10));
					valA=0;
				}
				
				if(opSelect !== '='){
					valueIn = 0;
				}
			}
		}
		this.setState({valueIn, valA, opSelect, list});
	}

	render() {
		const btNum = [1,2,3,4,5,6,7,8,9,'.',0,'C'];
		const btOp = ['+','-','*','/','='];

		const createButtonL = btNum.map((number, i) =>
			<button key={i} value={number} className="num" id={number} onClick={ () => this.show(number) } >{ number }</button>
		);
		const createButtonR = btOp.map((opr, i) =>
			<button key={i} value={opr} className="op" id={opr} onClick={ () => this.show(opr) } >{ opr }</button>
		);
		const createList = this.state.list.map((prevMath, i) => 
			<li key={i} >{prevMath}</li>
		);

		return (
			<div className="canvas">
				<div className="up">
					<input type="text" className="result" placeholder="0" value={this.state.valueIn || this.state.valA} />
				</div>

				<div className="history" >
					<label className="labelHist" >Previous Math</label>
					<hr />
					<ul className="listHist" >
						{ createList }
					</ul>
				</div>

				<div className="down" >
					<div className="right" >
						{ createButtonR }
					</div>
					<div className="left" >
						{ createButtonL }
					</div>
				</div>
			</div>
		);
	}
}

export default App;
