##  기초 문법 

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
    super(props);
    this.state = { value: 0 };
    this.countHandle = this.countHandle.bind(this);
  };
  
  countHandle() {
    this.setState({
      value:this.state.value + 1
    });
  };
   
  render() {
    return (
      <div>
        <div>{this.state.value}</div>
        <button onClick={this.countHandle}>Click Me</button>
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
