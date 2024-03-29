# 공식 문서가 제일 잘 되어 있음
https://redux.js.org/tutorials/index


# 리덕스의 3가지 규칙

1. 하나의 어플리케이션 안에는 하나의 스토어가 있다. (여러개 스토어 사용하는 것은 권장안함)
2. 상태는 읽기 전용 (불변성) 
- 불변성을 유지해야하는 이유는 내부적으로 데이터가 변경되는 감지를 하기 위하여 shallow equality 검사를 하기 때문
3. 변화를 일으키는 함수, 리듀서는 순수한 함수여야한다.
- 리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받는다.
- 이전에 상태는 절대 건들이지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환 해야한다.
- 날짜가 변경되는 함수나, 랜덤숫자를 생성하는 이런 결과가 달라지는 함수는 리덕스 미들웨어를 사용한다.



# Action
```js
/* 액션 타입 정의 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요. 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
```
# Action Createor
# Reducer
- 변화를 일으키는 함수
```js
/* 리듀서 선언 */
export default function counter(state = initialState, action) {
    switch (action.type) {
        case SET_DIFF:
            return {
                ...state,
                diff: action.diff
            }
        case INCREASE:
            return {
                ...state,
                number: state.number + state.diff
            }
        case DECREASE:
            return {
                ...state,
                number: state.number - state.diff
            }
        default:
            return state
    }
}
```
# Store
```js
import { legacy_createStore as createStore } from 'redux';
import rootReducer from './modules';
import { Provider } from 'react-redux'

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
```
# Dispatch
- 스토어의 내장 함수 중 하나. 액션을 발생시킨다
```js
const onIncrease = () => dispatch(increase());
const onDecrease = () => dispatch(decrease());
const onSetDiff = diff => dispatch(setDiff(diff));
```
# Subscribe
