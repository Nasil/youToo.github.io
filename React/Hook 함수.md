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


# useMemo


# useCallback


# useRef

# usePromise
