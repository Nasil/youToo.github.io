# 기본 CRUD 

```js
import logo from './logo.svg';
import './App.css';
import {useState} from 'react'

function Header(props) {
  console.log(props);
  return (
    <header>
      <h1><a href="/" onClick={(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

function Nav(props) {
  const list = []
  for(let i=0; i < props.topics.length; i++) {
    let t = props.topics[i];
    list.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return(
    <nav>
      <ol>
        {list}
      </ol>
    </nav>
  )
}

function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      console.log(title, body);
      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name='body' placeholder='body'/></p>
      <p><input type="submit" value="Create"/></p>
    </form>
  </article>
}

function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      <div>{props.body}</div>
    </article>
  )
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' value={title} onChange={event => {
        setTitle(event.target.value);
      }} placeholder='title'/></p>
      <p><textarea name='body' value={body} onChange={event => {
        setBody(event.target.value);
      }} placeholder='body'/></p>
      <p><input type="submit" value="Update"/></p>
    </form>
  </article>
}

function App() {
  //const _mode = useState("WELCOME") // 상태 정의
  //const mode = _mode[0];
  //const setMode = _mode[1];
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is'},
    {id:2, title:'css', body:'css is'},
    {id:3, title:'js', body:'js is'},
  ]);
  let content = null;
  let contextControll = null;

  if (mode === "WELCOME") {
    content = <Article title="welcome" body="Hello, WEB" ></Article>
  } else if (mode === "READ") {
    let title, body = null;
    for(let i = 0; i<topics.length ; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControll = <>
      <li>
        <a href={'/update/' + id} onClick={event => {
          event.preventDefault();
          setMode('UPDATRE');
        }}>Update</a>
      </li>
      <li>
        <input type="button" value="Delete" onClick={event => {
          setMode('DELETE');
        }}/>
      </li>
    </>
  } else if (mode === "CREATE") {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics] // 배열 복제
      newTopics.push(newTopic) // 복제본에 추가
      setTopics(newTopics); // set 시에 react 가 비교해서 다르면 업데이트해줌
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>  
  } else if (mode === 'UPDATRE') {
    let title, body = null;
    for(let i = 0; i<topics.length ; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(_title, _body)=> {
      const updateTopic = {id:id, title:_title, body:_body}
      const newTopics = [...topics] // 배열 복제
      for(let i=0; i<newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updateTopic;  // 업데이트
          break;
        }
      }
      setTopics(newTopics); // set 시에 react 가 비교해서 다르면 업데이트해줌
      setMode('READ');
    }}></Update>  
  } else if (mode === 'DELETE') {
    const newTopic = []
    for(let i = 0; i<topics.length ; i++) {
      if (topics[i].id !== id) {
        newTopic.push(topics[i]);
      }
    }
    setTopics(newTopic);
    setMode('WELCOME');
  }

  return (
    <div>
      <Header title="REACT STUDY" onChangeMode={()=>{
        //alert("header");
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        //alert(_id);
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        
        {contextControll}
      </ul>
    </div>
  );
}

export default App;

```
