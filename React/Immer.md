
# 배열 기본 조작
```js
const todos = [
  {
    id: 1,
    text: '할 일 #1',
    done: true
  },
  {
    id: 2,
    text: '할 일 #2',
    done: false
  }
];

// 배열 끝에 추가하기
const inserted = todos.concat({ 
  id: 3,
  text: '할 일 #3',
  done: false
});

// 필터하기
const filtered = todos.filter(todo => todo.id !== 2);

// 
const toggled = todos.map(
  todo => todo.id === 2
    ? {
      ...todo,
      done: !todo.done,
    }
    : todo
);
```
