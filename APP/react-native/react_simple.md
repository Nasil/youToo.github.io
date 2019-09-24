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

```JS
class MapModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactData: [
        {name: "dark", phone: "010-0000-0001"},
        {name: "blue", phone: "010-0000-0002"},
        {name: "black", phone: "010-0000-0003"},
        {name: "white", phone: "010-0000-0004"}
      ]
    };
  }
  render(){
    return(
      <div>
        <h1>Contacts</h1>
        <ul>
          {this.state.contactData.map((contact, i) => {
            return (<ContactInfo name={contact.name} phone={contact.phone} key={i}/>);
          })}
        </ul>
      </div>
    );
  }
}

class ContactInfo extends React.Component {
  render() {
    return(
      <li>{this.props.name} {this.props.phone}</li>
    );
  }
}

class App extends React.Component{ 
  render() {
   return(<MapModule/>); 
  }
}

ReactDOM.render(<App/>, document.getElementById("root"))
```
