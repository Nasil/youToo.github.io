```js
class CodeWeb extends React.Component {
  render() {
    let style2 = {
      backgroundColor : 'blue'  
    };
    let text = "hello world";
    return(
      <div>
        <div style={style2}>{text}</div>
        <div>{this.props.number}</div>
        <div name={this.props.name}>Good {this.props.children}</div>
      </div>
    );   
  }
}

CodeWeb.propTypes = {

};

class App extends React.Component {
  render() {
    return (
      <CodeWeb name={this.props.name} number={this.props.number}>{this.props.children}</CodeWeb>
    );
  }
}

ReactDOM.render(<App name="test" number={5}>Hi React</App>, document.getElementById("root"));
```

```js
class Counter extends React.Component {
  constructor(props) {
    super(pops);
    this.state = {
      value: 0
    };
    this.handleClick=this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState({
      value:this.state.value + 1
    });
  }
  
  render() {
    return (
      <div>
        <h2>{this.state.value}</h2>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <Counter/>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById("root"));
```
