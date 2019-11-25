## Vue.js ?  

- 프론트엔드 자바스크립트 프레임워크입
- MVVM 패턴의 ViewModel 레이어에 해당하는 화면단 라이브러리


## 함수

- v-text
- v-html
- v-show
- v-if 
- v-if-else
- v-else
- v-pre
- v-cloak: 자바스크립트가 실행 되기전에, 그러니까, Vue 인스턴스가 제대로 준비되기 전 까지 우리의 템플렛을 위한 HTML 코드를 숨기고 싶을 때
- v-once: 초기 값
- v-bind: 
  - img v-bind:src="url1"
  - img :src="url2"
- v-for="todo in todos"
- v-model="value"
- v-on:click === @click


```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>
<body>
  <div id="app" v-cloak>
    <h2>{{ Date() }}</h2>
    <ul>
      <li v-for="todo in todos">{{ todo.text }}</li>
    </ul>
    <ul>
      <li v-for="(todo, index) in todos">{{ index + 1 }} {{ todo.text }}</li>
    </ul>
    <h1 v-if="value > 5">value가 5보다 크군요</h1>
    <h1 v-else-if="value === 5">값이 5네요</h1>
    <h1 v-else>value가 5보다 작아요</h1>
    <h2 v-once>초기 값: {{ value }}</h2>
    <h2>현재 값: {{ value }}</h2>
    <h3 v-pre>{{ 이건 그대로 렌더링해줘요 }}</h3>
    
    <h1>카운터: {{ number }}</h1>
    <span v-text="name" v-show="visible"></span>
    <button @click="increment">증가</button>
    <button @click="decrement">감소</button>
    <p></p>
    <img v-bind:src="feelsgood"/>
  </div>
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
</body>
</html>
```
```javascript
var app = new Vue({
  el: '#app', 
  data: {
    todos: [
      { text: 'Vue.js 튜토리얼 작성하기' },
      { text: 'Webpack2 알아보기' },
      { text: '사이드 프로젝트 진행하기' }
    ],
    number: 0,
    name: '버튼: ',
    visible: false,
    value : 5,
    smile : true,
    feelsgood: 'https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E'
  },
  // app 뷰 인스턴스를 위한 메소드들
  methods: {
    increment: function() {
      // 인스턴스 내부의 데이터모델에 접근 할 땐,
      // this 를 사용한다.
      this.number++;
    },
    decrement: function() {
      this.number--;
    }
  }
});
```
```css
[v-cloak] {
  display: none;
}
```

