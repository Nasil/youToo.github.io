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
- terminal 에서 tsc 입력하면 dist 경로에 컴파일 생성됨
