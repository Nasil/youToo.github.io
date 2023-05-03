
# 배열 기본 조작
```js
const todos = [
  {
    id: 1,
    text: "할 일 #1",
    done: true
  },
  {
    id: 2,
    text: "할 일 #2",
    done: false
  }
];

// 배열 끝에 추가하기
const inserted = todos.concat({
  id: 3,
  text: "할 일 #3",
  done: false
});
console.log("inserted", inserted);

// 필터하기
const filtered = todos.filter((todo) => todo.id !== 2);
console.log("filtered", filtered);

// 찾아서 업데이트하기
const toggled = todos.map((todo) =>
  todo.id === 2
    ? {
        ...todo,
        done: !todo.done
      }
    : todo
);
console.log("toggled", toggled);
```

## immer 로 사용
```
import produce from "immer";

const todos = [
  {
    id: 1,
    text: "할 일 #1",
    done: true
  },
  {
    id: 2,
    text: "할 일 #2",
    done: false
  }
];

// 배열 끝에 추가하기

const _todo = {
  id: 3,
  text: "할 일 #3",
  done: false
};
const inserted = produce(todos, (draft) => {
  draft.push(_todo);
});
console.log("inserted", inserted);

// 필터하기
const filtered = produce(todos, (draft) => {
  const index = draft.findIndex((todo) => todo.id !== 2);
  draft.splice(index, 1);
});
console.log("filtered", filtered);

// 찾아서 업데이트하기
const toggled = produce(todos, (draft) => {
  const user = draft.find((todo) => todo.id === 2);
  user.done = !user.done;
});
console.log("toggled", toggled);

// 단순 업데이트
const state = {
  number: 1,
  dontChangeMe: 2
};

const nextState = produce(state, (draft) => {
  draft.number += 1;
});

console.log(nextState);

```
