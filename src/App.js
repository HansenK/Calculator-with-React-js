import React, { Component } from 'react';
import './App.css';

class App extends Component {

	constructor(){
		super();
		this.state = {
			valueIn: 0,
			valA: 0,
			opSelected: null,
			list: []
		}
	}

	show(valueB){
	
		let valueIn = this.state.valueIn;
		let valA = this.state.valA; 
		let opSelected = this.state.opSelected;
		let list = this.state.list;
		let resHist;

		if(valueB === 'C'){
			valueIn = 0;
			valA = 0;
			opSelected = null;
			list.push('*Clear*');
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
				opSelected = valueB;
			}

			if(valueIn !== 0 && valA !== 0){
				
				if(this.state.opSelected === '+'){
					resHist = parseFloat(valA, 10) +(this.state.opSelected)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) + parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelected = valueB;
				}
				if(this.state.opSelected === '-'){
					resHist = parseFloat(valA, 10) +(this.state.opSelected)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) - parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelected = valueB;
				}
				if(this.state.opSelected === '*'){
					resHist = parseFloat(valA, 10) +(this.state.opSelected)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) * parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelected = valueB;
				}
				if(this.state.opSelected === '/'){
					resHist = parseFloat(valA, 10) +(this.state.opSelected)+ parseFloat(valueIn, 10);
					valA = parseFloat(valA, 10) / parseFloat(valueIn, 10);
					resHist = resHist +' = '+ valA;
					list.push(resHist);
					opSelected = valueB;
				}
				if(opSelected === '='){
					valueIn = parseFloat(parseFloat(valA, 10) +(this.state.opSelected)+ parseFloat(valueIn, 10));
					valA=0;
				}
				
				if(opSelected !== '='){
					valueIn = 0;
				}
			}
		}
		this.setState({valueIn, valA, opSelected, list});
	}

	render() {
		const btNum = [1,2,3,4,5,6,7,8,9,'.',0,'C'];
		const btOp = ['+','-','*','/','='];
		let classNm;

		const createButtonL = btNum.map((number, i) =>
			<button key={i} value={number} className="num" id={number} onClick={ () => this.show(number) } >{ number }</button>
		);
		const createButtonR = btOp.map((opr, i) => {
			opr === this.state.opSelected ? classNm = "clicked" : classNm = "op";
			if(opr === '=') classNm = "op";
			return <button key={i} value={opr} className={classNm} id={opr} onClick={ () => this.show(opr) } >{ opr }</button>
		});
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
