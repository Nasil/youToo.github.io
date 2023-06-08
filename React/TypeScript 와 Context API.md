### SampleContext.tsx
```js
import React, { useReducer, useContext, createContext, Dispatch } from 'react';

type Color = 'red' | 'orange' | 'yellow';

// 상태를 위한 타입
type State = {
    count: number,
    text: string,
    color: Color;
    isGood: boolean;
};

type Action = 
    | {type: 'SET_COUNT'; count: number}
    | {type: 'SET_TEXT'; text: string}
    | {type: 'SET_COLOR'; color: Color}
    | {type: 'TOGGLE_GOOD'};

// dispatch 를 위한 타입 
// 액션들의 타입을 Dispatch 의 Generics 로 설정
type SampleDispatch = Dispatch<Action>;

// context API
// Context 는 리액트 컴포넌트에서 Props 가 아닌 또 다른 방식으로 컴포넌트에 값을 전달하는 방법 (Props Drilling 방지)
const SampleStateContext = createContext<State | null>(null);
const SampleDispatchContext = createContext<SampleDispatch | null>(null);

// reducer 는 현재 상태(state)와 액션 객체(action)를 파라미터로 받아와서 새로운 상태(State)를 반환해주는 함수
// useReducer 로 구현했을 때의 장점은 useState 의 setState 함수를 여러번 사용하지 않아도 된다는점과, 리듀서로 로직을 분리했으니 다른곳에서도 쉽게 재사용을 할 수 있다.
// 
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_COUNT':
            return {
                ...state,
                count: action.count
            };
        case 'SET_TEXT':
            return {
                ...state,
                text: action.text
            }
        case 'SET_COLOR':
            return {
                ...state,
                color: action.color
            }
        case 'TOGGLE_GOOD':
            return {
                ...state,
                isGood: !state.isGood
            }
        default:
            throw new Error('Unhandled action');
    }
}

// SampleProvider 에서 useReducer 를 사용하고 
// SampleStateContext.Provider 와 SampleDispatchContext.Provider 로 children 을 감싸서 반환합니다.
export function SampleProvider({ children }: {children: React.ReactNode}) {
    const [state, dispatch] = useReducer(reducer, {
        count: 0,
        text: 'hello',
        color: 'red',
        isGood: true
    });
    return (
        <SampleStateContext.Provider value={state}>
            <SampleDispatchContext.Provider value={dispatch}>
                {children}
            </SampleDispatchContext.Provider>
        </SampleStateContext.Provider>
    )
}

export function useSampleState() {
    const state = useContext(SampleStateContext);
    if (!state) throw new Error ('Cannot find SampleProvider');
    return state;
}

export function useSampleDispatch() {
    const dispatch = useContext(SampleDispatchContext);
    if (!dispatch) throw  new Error('Cannot find SampleProvider');
    return dispatch;
}
```


### App.tsx
```js
import React from 'react';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';

const App: React.FC = () => {
  return (
    <SampleProvider>
      <ReducerSample />
    </SampleProvider>
  )
};

export default App;
```

### ReducerSample.tsx
```js
import React from 'react';
import { useSampleState, useSampleDispatch } from './SampleContext';

function ReducerSample() {
    const state = useSampleState();
    const dispatch = useSampleDispatch();

    const setCount = () => dispatch({type:'SET_COUNT', count:5});
    const setText = () => dispatch({type:'SET_TEXT', text:'bye'});
    const setColor = () => dispatch({type:'SET_COLOR', color:'orange'});
    const toggleGood = () => dispatch({type:'TOGGLE_GOOD'});

    return (
        <div>
            <p>
                <code>count: </code> {state.count}
            </p>
            <p>
                <code>count: </code> {state.text}
            </p>
            <p>
                <code>color: </code> {state.color}
            </p>
            <p>
                <code>isGood: </code> {state.isGood ? 'true' : 'false'}
            </p>
            <div>
                <button onClick={setCount}>SET_COUNT</button>
                <button onClick={setText}>SET_TEXT</button>
                <button onClick={setColor}>SET_COLOR</button>
                <button onClick={toggleGood}>TOGGLE_GOOD</button>
            </div>
        </div>
    );

}

export default ReducerSample;
```
