# 타입스크립트?
- 타입스크립트는 자바스크립트에 타입을 부여한 언어
- 자바스크립트와 다르게 브라우저에서 실행하려면 파일을 한번 변환(compile)해줘야한다. (.ts)

# 장점
- 객체 지향 프로그래밍 지원 : ES6에서 새롭게 사용된 문법을 포함하고 있으며 클래스, 인터페이스, 상속, 모듈 등과 같은 객체 지향 프로그래밍 패턴을 제공

# 설치
```
npm init -y
npm install -g typescript
tsc --init // tsconfig.json 파일이 자동생성
```

# Hello word
```js
const message: string = 'hello world';
console.log(message);
```
- tsconfig.json 아래 추가
```json
"outDir": "./dist"
```
- terminal
```
>> tsc // dist 경로에 컴파일 생성됨
>> node dist/practice.js // js 실행
```


# TS와 TSX의 차이
- TS (TypeScript): TypeScript는 JavaScript를 기반으로 하며, 정적 타입 검사를 지원하는 JavaScript의 슈퍼셋이다. TS는 대개 .ts 파일 확장자를 사용한다.
- TSX (TypeScript with JSX): TSX는 React에서 UI를 작성하는 데 사용되는 TypeScript이다. React에서 JSX를 사용하는 경우 일반적으로 TSX 파일 확장자를 사용한다.
- 따라서, TS는 JavaScript 코드에서 타입 검사와 컴파일 타임 오류 검사를 수행하는 데 사용되고, TSX는 React에서 UI를 작성할 때 TypeScript를 사용하여 타입 검사를 수행하는 데 사용된다.
- TS와 TSX 모두 TypeScript 언어의 문법을 사용하므로, TypeScript에서 사용할 수 있는 모든 기능과 타입 검사 기능을 TSX에서도 사용할 수 있다.
- TSX는 React 컴포넌트와 함께 사용되기 때문에, React의 JSX 문법도 함께 사용할 수 있다. TS와 TSX 모두 TypeScript 컴파일러에 의해 JavaScript 코드로 변환된다.
