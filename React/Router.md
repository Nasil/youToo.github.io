
# 라우터 사용하기

```
npm install react-router-dom
```


# index.js
```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```


# app.js
```js
import { Route, Link, Routes } from "react-router-dom";
import About from './About';
import Home from './Home';
import Profile from './Profile';

function App() {
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <div>
      <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/about/:id" element={<About />} />
          <Route path="/profiles/:username" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
```

# About.js
http://localhost:3000/about/1?search=hi&test=true
```js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const About = () => {
    const {pathParam} = useParams(); // const pathParam = useParams().id; 같은 의미
    const location = useLocation();
    let [searchParams] = useSearchParams();
    // const keyWord = searchParams.get("prd_name");

  return (
    <div>
        <h1>소개 {pathParam}</h1>
        <p>이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트랍니다.</p>
        <ul>
            <li>hash : {location.hash}</li>
            <li>pathname : {location.pathname}</li>
            <li>search : {location.search}</li>
            <li>state : {location.state}</li>
            <li>key : {location.key}</li>
        </ul>
        <ul>
            <li>searchParams.get(key) : {searchParams.get('search')}</li>
            <li>searchParams.getAll(key) : {searchParams.getAll('search')}</li>
            <li>searchParams.toString() : {searchParams.toString()}</li>
        </ul>
    </div>
  );
};

export default About;
```
```
소개 1
이 프로젝트는 리액트 라우터 기초를 실습해보는 예제 프로젝트랍니다.

hash :
pathname : /about/1
search : ?search=hi&test=true
state :
key : default
searchParams.get(key) : hi
searchParams.getAll(key) : hi
searchParams.toString() : search=hi&test=true
```
