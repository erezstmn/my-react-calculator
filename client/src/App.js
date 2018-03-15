import React, { Component } from 'react';
import { Textfit } from 'react-textfit';
import NumberFormat from 'react-number-format';
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
    this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
    this.handleOnMouseUp = this.handleOnMouseUp.bind(this); 
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state= {
      newCalculation:true,
      numberToRender:"0",
      leftOperand:null,
      operator:null,
      isDecimalAvailable: true,
      resultClass: "result-big",
      lightgrat:"lightgray",
      acButton:"AC"
    }
  }  
  // componentWillUpdate(nextProps, nextState){
  //   console.log(nextState);
  // }+
  componentWillMount(){
    document.addEventListener("keypress", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
}
  handleNClick(e){
    let num = e.target.value;
    this.setState((prevState) => {
      let newNumber = (this.state.numberToRender==="0" || this.state.newCalculation) ? num : prevState.numberToRender + num;
      return {
        numberToRender: newNumber,
        newCalculation: false,
        acButton:"C"
      };
    })
  }
  handleACClick(e){
    if(e.target.value==="AC"){
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
    if(e.target.value==="C"){
      this.setState(() =>{
        return {
          numberToRender: "0",
          acButton:"AC"
        };
      })
    }
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
          isDecimalAvailable: false,
          acButton:"C"
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
        isDecimalAvailable: true,
        acButton:"C"
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
          leftOperand: prevState.numberToRender,
          acButton:"C"
        };
      }
    })
  }
  handleOnMouseDown(e){   
    switch(e.target.className){
      case "App-ButtonNumbers":
      case "App-ZeroButton":
        e.target.style='background-color:silver;';
        break;
      case "App-ButtonOperators":
        e.target.style='background-color:RGB(207, 145, 39);';
        break;
      case "App-ButtonFirstRow":
        e.target.style='background-color:RGB(165, 163, 163);';
        break;
      default:
        break;
    }
  }
  handleOnMouseUp(e){    
    switch(e.target.className){
      case "App-ButtonNumbers":
      case "App-ZeroButton":
        e.target.style='background-color:lightgray;';
        break;
      case "App-ButtonOperators":
        e.target.style='background-color:orange;';
        break;
        case "App-ButtonFirstRow":
        e.target.style='background-color:silver;';
        break;
      default:
        break;
    }
  }
  handleKeyPress(e){
    if (parseInt(e.key,10) || e.key==="0"){
        let object ={
          target:{
            value: e.key
          }
        }  
      this.handleNClick(object);
    }    
  }    

  render() {
    return (
      <div className="App">
        <Textfit mode="single" max="70" className="result"><NumberFormat value={this.state.numberToRender} displayType={'text'} thousandSeparator={true}/></Textfit>               
        <button className="App-ButtonFirstRow" value={this.state.acButton} onClick={this.handleACClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>{this.state.acButton}</button>
        <button className="App-ButtonFirstRow" onClick={this.handlePlusMinusClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>+-</button>
        <button className="App-ButtonFirstRow" value="%" onClick={this.handleOperatorClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>%</button>
        <button className="App-ButtonOperators" value="/" onClick={this.handleOperatorClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>/</button><br/>
        <button className="App-ButtonNumbers" value="7" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>7</button>
        <button className="App-ButtonNumbers" value="8" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>8</button>
        <button className="App-ButtonNumbers" value="9" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>9</button>
        <button className="App-ButtonOperators" value="*" onClick={this.handleOperatorClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>X</button><br/>
        <button className="App-ButtonNumbers" value="4" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>4</button>
        <button className="App-ButtonNumbers" value="5" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>5</button>
        <button className="App-ButtonNumbers" value="6" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>6</button>
        <button className="App-ButtonOperators" value="-" onClick={this.handleOperatorClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>-</button><br/>
        <button className="App-ButtonNumbers" value="1" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>1</button>
        <button className="App-ButtonNumbers" value="2" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>2</button>
        <button className="App-ButtonNumbers" value="3" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>3</button>
        <button className="App-ButtonOperators" value="+" onClick={this.handleOperatorClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>+</button><br/>
        <button className="App-ZeroButton" value="0" onClick={this.handleNClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>0</button>
        <button className="App-ButtonNumbers" onClick={this.handleDecimalClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>.</button>
        <button className="App-ButtonOperators" onClick={this.handleEqualClick} onMouseDown={this.handleOnMouseDown} onMouseUp={this.handleOnMouseUp}>=</button>               
      </div>
    );
  } 
}

export default App;
