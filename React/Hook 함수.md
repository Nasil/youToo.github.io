# useState
- 함수형 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해줌
 
```js
const [inputs, setInputs] = useState({
  username: '',
  email: ''
})
const onChange = useCallback(
  e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ // object 타입 넣기
      ...inputs,
      [name]: value
    }));
  },
  []
);

const [users, setUsers] = useState([
  {
    id: 1,
    username: 'velopert',
    email: 'public.velopert@gmail.com',
    active: true
  },
  {
    id: 2,
    username: 'tester',
    email: 'tester@example.com',
    active: false
  },
  {
    id: 3,
    username: 'liz',
    email: 'liz@example.com',
    active: false
  }
]);
const user = {
  id: nextId.current,
  username,
  email
};
// Array에 추가하기
// 방법1
setUsers([...users, user]);
// 방법2
setUsers(users => users.concat(user));

```

# useEffect
- useEffect 는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook 입니다. 
- 클래스형 컴포넌트의 componentDidMount 와 componentDidUpdate 를 합친 형태로 보아도 무방합니다.

# useContext
- dispatch 를 Context API 를 사용해서 전역적으로 사용 할 수 있게 해주면 컴포넌트에게 함수를 전달해줘야 하는 상황에서 코드의 구조가 훨씬 깔끔해질 수 있습니다.
- 만약에 깊은 곳에 위치하는 컴포넌트에게 여러 컴포넌트를 거쳐서 함수를 전달해야 하는 일이 있다면 이렇게 Context API 를 사용하시면 됩니다.

```js
import React, { useEffect, useContext } from 'react';
import { UserDispatch } from './App';

const User = React.memo(function User({ user }) {
  const dispatch = useContext(UserDispatch); // useContext 사용

    useEffect(() => {
        console.log('user 값이 설정됨');
        console.log(user);
        return () => {
          console.log('user 가 바뀌기 전..');
          console.log(user);
        };
      }, [user]);
      return (
        <div>
          <b
            style={{cursor: 'pointer', color: user.active ? 'green' : 'black'}}
            onClick={() => {
              dispatch({ type: 'TOGGLE_USER', id: user.id });
            }}
          >
            {user.username}
          </b>
          &nbsp;
          <span>({user.email})</span>
          <button
            onClick={() => {
              dispatch({ type: 'REMOVE_USER', id: user.id });
            }}
          >
            삭제
          </button>
        </div>
      );
    });

const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <User user={user} key={user.id}/>
      ))}
    </div>
  );
}

export default React.memo(UserList);
```
```js
// dispath
const [state, dispatch] = useReducer(reducer, initialState);

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = React.createContext(null);

return (
   <UserDispatch.Provider value={dispatch}>
     <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
     <UserList users={users}/>
     <div>활성사용자 수 : {count}</div>
   </UserDispatch.Provider>
 );

```

# useReducer
- reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
- 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있고, 상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수도 있고, 심지어 다른 파일에 작성 후 불러와서 사용 할 수도 있음.
- useReducer 로 구현했을 때의 장점은 useState 의 setState 함수를 여러번 사용하지 않아도 된다는점과, 리듀서로 로직을 분리했으니 다른곳에서도 쉽게 재사용을 할 수 있다.
```js
import React, { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT' :
            return state + 1;
        case 'DECREMENT' : 
            return state - 1;
        default:
            return state;
    }
}

function Counter() {
    // state: 컴포넌트에서 사용 할 수 있는 상태
    // dispatch: 액션을 발생시키는 함수
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [number, setNumber] = useReducer(reducer, 0);

    const onIncrease = () => {
        //setNumber(number + 1);
        //setNumber(prevNumber => prevNumber + 1); // 최적화
        dispatch({ type: 'INCREMENT' });
    }
    const onDecrease = () => {
        //setNumber(number - 1);
        //setNumber(prevNumber => prevNumber - 1);
        dispatch({ type: 'DECREMENT' });
    }

    return (
        <div>
          <h1>{ number }</h1>
          <button onClick={onIncrease}>+1</button>
          <button onClick={onDecrease}>-1</button>
        </div>
    );
}
```

# useMemo
```js
function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중 ...');
  return users.filter(user => user.active).length;
}

// useMemo : 특정 결과값을 재사용할때 사용
// useMemo 의 첫번째 파라미터에는 어떻게 연산할지 정의하는 함수를 넣어주면 되고 두번째 파라미터에는 deps 배열을 넣어주면 되는데, 
// 이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 
// 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용
const count = useMemo(() => countActiveUsers(users), [users]);
```

# useCallback
```js
// 함수 안에서 사용하는 상태 혹은 props 가 있다면 꼭, deps 배열안에 포함
 const onChange = useCallback(
   e => {
     const { name, value } = e.target;
     setInputs(inputs => ({
       ...inputs,
       [name]: value
     }));
   },
   []  // [inputs] 
 );
```


# useRef
- useRef() 를 사용하여 Ref 객체를 만들고, 이 객체를 우리가 선택하고 싶은 DOM 에 ref 값으로 설정해주어야 합니다.
- 그러면, Ref 객체의 .current 값은 우리가 원하는 DOM 을 가르키게 됩니다.
```js
// 예제1)
const nameInput = useRef();
const onReset = () => {
   setInputs({
     name: '',
     nickname: ''
   });
   nameInput.current.focus();
 };

// 예제2)
const nextId = useRef(4);
const user = {
  id: nextId.current,
  username,
  email
};
```

# usePromise


# 커스텀 훅
```js
import { useState, useCallback } from 'react';

function UseInputs(initialForm) {
    const [form, setForm] = useState(initialForm);

    const onChange = useCallback(e => {
        const {name, value} = e.target;
        setForm(form => ({...form, [name] : value}));
    }, []);

    const reset = useCallback(() => setForm(initialForm), [initialForm]);

    return [form, onChange, reset];
}


export default UseInputs;
```
```js
const [{ username, email }, onChange, reset] = UseInputs({
  username: '',
  email: ''
});
```
```js
const onCreate = useCallback(() => {
  dispatch(
    {
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    }
  );
  reset();
  nextId.current += 1;
}, [username, email, reset]);
```


참조) https://react.vlpt.us/
