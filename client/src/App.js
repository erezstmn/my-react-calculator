import React, { Component } from 'react';
import './App.css';



class App extends Component {
  constructor(props){
    super(props);  
    this.handleNClick = this.handleNClick.bind(this);
    this.handleACClick = this.handleACClick.bind(this);
    this.handlePlusMinusClick = this.handlePlusMinusClick.bind(this);
    this.handleEqualClick = this.handleEqualClick.bind(this);  
    this.handleDecimalClick = this.handleDecimalClick.bind(this);
    this.handleOperatorClick = this.handleOperatorClick.bind(this);
    this.state= {
      newCalculation:true,
      numberToRender:"0",
      leftOperand:null,
      operator:null,
      isDecimalAvailable: true,
      resultClass: "result-big"
    }
  }  
  // componentWillUpdate(nextProps, nextState){
  //   console.log(nextState);
  // }
  handleNClick(e){
    let num = e.target.value;
    this.setState((prevState) => {
      let newNumber = (this.state.numberToRender==="0" || this.state.newCalculation) ? num : prevState.numberToRender + num;
      return {
        numberToRender: newNumber,
        newCalculation: false
      };
    })
  }
  handleACClick(){
    this.setState(() =>{
      return {
        newCalculation: true,
        numberToRender: "0",
        leftOperand: null,
        operator: null,
        isDecimalAvailable: true,

      };
    })
  }
  handlePlusMinusClick(){  
    let number = parseFloat(this.state.numberToRender,10);
    number = -number;
    this.setState(() =>{
      return {
        numberToRender: ""+number
      };
    })
  }
  handleDecimalClick(){
    this.setState((prevState) => {
      if (this.state.isDecimalAvailable){
        let newNumber = (this.state.numberToRender==="0" || this.state.newCalculation) ? "0." : prevState.numberToRender + ".";
        return {
          numberToRender: newNumber,
          newCalculation: false,
          isDecimalAvailable: false
        };
      } else{
        return;
      }
    })
  }
  handleEqualClick(){
    this.setState((prevState) => {
      let left = this.state.leftOperand ? parseFloat(this.state.leftOperand,10) : 0;
      let right = parseFloat(this.state.numberToRender, 10);
      let result;
      switch(this.state.operator){
        case "+":
          result = left + right;
          break;
        case "-":
          result = left - right;
          break;
        case "*":
          result = left * right;
          break;
        case "/":
          result = left / right;
          break;       
        default:
          result = prevState.numberToRender;
          break;
      }
      return {
        newCalculation: true,        
        numberToRender: result,
        operator:null,
        isDecimalAvailable: true
      };
    })
  }
   handleOperatorClick(e){
    let operator = e.target.value;
    this.setState((prevState) => {
      if (operator==="%"){
        return {
          isDecimalAvailable: false,
          numberToRender: parseFloat(prevState.numberToRender)/100
        }
      }else{      
        return{
          operator: operator,
          newCalculation: true,
          isDecimalAvailable: true,
          leftOperand: prevState.numberToRender
        };
      }
    })
  }
  render() {
    return (
      <div className="App">
        <p className="result">{this.state.numberToRender}</p>        
        <button className="App-ButtonFirstRow" onClick={this.handleACClick}>AC</button>
        <button className="App-ButtonFirstRow" onClick={this.handlePlusMinusClick}>+-</button>
        <button className="App-ButtonFirstRow" value="%" onClick={this.handleOperatorClick}>%</button>
        <button className="app-ButtonOperators" value="/" onClick={this.handleOperatorClick}>/</button><br/>
        <button className="app-ButtonNumbers" value="7" onClick={this.handleNClick}>7</button>
        <button className="app-ButtonNumbers" value="8" onClick={this.handleNClick}>8</button>
        <button className="app-ButtonNumbers" value="9" onClick={this.handleNClick}>9</button>
        <button className="app-ButtonOperators" value="*" onClick={this.handleOperatorClick}>*</button><br/>
        <button className="app-ButtonNumbers" value="4" onClick={this.handleNClick}>4</button>
        <button className="app-ButtonNumbers" value="5" onClick={this.handleNClick}>5</button>
        <button className="app-ButtonNumbers" value="6" onClick={this.handleNClick}>6</button>
        <button className="app-ButtonOperators" value="-" onClick={this.handleOperatorClick}>-</button><br/>
        <button className="app-ButtonNumbers" value="1" onClick={this.handleNClick}>1</button>
        <button className="app-ButtonNumbers" value="2" onClick={this.handleNClick}>2</button>
        <button className="app-ButtonNumbers" value="3" onClick={this.handleNClick}>3</button>
        <button className="app-ButtonOperators" value="+" onClick={this.handleOperatorClick}>+</button><br/>
        <button className="App-Button1" value="0" onClick={this.handleNClick}>0</button>
        <button className="app-ButtonNumbers" onClick={this.handleDecimalClick}>.</button>
        <button className="app-ButtonOperators" onClick={this.handleEqualClick}>=</button>               
      </div>
    );
  }
}

export default App;
