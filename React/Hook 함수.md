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



# useReducer
- reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
- 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있고, 상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수도 있고, 심지어 다른 파일에 작성 후 불러와서 사용 할 수도 있음.
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
```
const nextId = useRef(4);
```

# usePromise
