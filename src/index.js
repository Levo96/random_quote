import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';


const randomNumber = (range) => {
  return Math.floor(Math.random() * (range+1));
}

window.onload = () => {
  
  // --- Random Quote App ----
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        quote: 'By seeking and blundering we learn.',
        author: 'Johann Wolfgang von Goethe',
        color: "white"
      }
    }
    
    componentDidMount() {
      fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(
        (result) => {
          let rand = randomNumber(result.length);
          let color =  "rgb(" + randomNumber(255) + "," + randomNumber(255) + "," +  randomNumber(255) + ")";
          let obj = result[rand];
          console.log(obj);
          this.setState({
            quote: obj["text"],
            author: obj["author"],
            color: color
          });
          
        },
        (error) => {
          this.setState({
            quote: this.state.quote,
            author: this.state.author,
            color: this.state.color
          });
        }
      )
  }

       
    render(){
      document.getElementById("root").style.backgroundColor = 
        this.state.color;
      return (
        <div className="app_div">
          <h2 style={{color: this.state.color}}><span>"</span>  {this.state.quote} <span>"</span></h2>
          <h3><span>-</span>        {this.state.author}</h3>
          <button onClick={this.componentDidMount.bind(this)} >New Quote</button>
        </div>
      );
    }
  }
  
  let root_element = document.getElementById("root");
  ReactDOM.render(<App />, root_element);
  
}//-------------------------------------------------------



serviceWorker.unregister();
