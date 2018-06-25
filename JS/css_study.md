* (class vs id), (div vs span)의 차이점에 관해서 설명해주세요.
```
- id 는 한 페이지에 하나의 정의(style/css)로 하나의 태그만 사용할 수 있다 (로고, 상단메뉴, 하단 정보 같은 스타일을 정의 할 때 사용) -> css 에서는 #id값 
- class는 한페이지에 반복 정의가 가능하다 -> css 에서는 .class값
- div = style="display: block;" div와 block 은 블럭을 쌓듯 위로 포개지는 속서을 가지고 있으며 width, height 값에 영향을 받는다.
- span = stype="display: inline;" span과 inline의 뜻 처럼 질렬 또는 횡렬로 다닥 붙어 있는 속성을 가지고 있으며 안에 들어가는 내용의 크기 만큼 제한 된다. 즉 width, height 영향을 받지 않는다. 
```
* Floats가 어떻게 동작하는지 설명해주세요.
```
HTML에서는 normal flow 라는 개념이 있다. 블락(div, span, p...)이 화면에서 차곡차곡 배치가 된다면 그 위치를 조정하는게 float 이다.
- left : 왼쪽으로 배치
- right : 오른쪽으로 배치
- both : left/right 둘중 어느 float을 만나더라도 아래에 배치 
- inherit : 자신의 부모 elect 의 clear 속성을 상속
- none : 기본 
```
* overflow 란 
```
- 박스의 내용이 많을때 어떻게 보일지 선택하는 속성
- visible : 기본값으로 내용이 더 길면 박스 크기를 넘어서 보인다. 
- hidden : 내용이 넘치면 자른다. 자른 부분은 보이지 낳는다.
- scroll : 내용이 넘치지 않아도 항상 스크롤바가 보인다.
- auto : 내용이 잘릴 때만 스크롤바가 보인다.

```
* BFC(Block Formatting Context)에 관해 설명해주세요
```
컨테이닝 영역 (containing block) 
1. Content area
2. Padding area
3. Border area
4. Margin area 
컨테이닝 영역에 따라 position이 달라 질 수 있다.
- static : 기본값, 위치가 지정된 것이 아니다.
- relative : 기본(static) 위치와 다르게 조정할 떄 사용 된다, ex) 박스가 아래로 위치 조정 
- absolute : 원래의 위치와 상관없이 위치 조정할 수 있다.  ex) 박스가 겹쳐질수 있음
- fixed : 브라우저 화면의 상대 위치 ex) 브라우저가 변경되더라도 항상 그 위치
```
* z-index에 관해 설명해주세요.
```
z-index는 position(relative, absolute, fixed) 속성이 적용된 요소에서만 작동되며 객체가 앞으로 나올지, 뒤로 나올지 결정하는 속성이다.
- auto : 기본
- number : 배치 순서를 결정, 숫자가 낮을 수록 뒤에 배치되며 숫자가 높을수록 앞에 나온다.
- initial : 기본값으로 설정
```
* "reset" CSS가 무엇인지, 어떻게 유용한지 설명해주세요.
```

```
* 클리어링(Clearing) 기술에는 어떤 것들이 있으며, 어떨 때 어떻게 사용하는 것이 적절한지 설명하세요.
```
- https://ofcourse.kr/css-course/clear-%EC%86%8D%EC%84%B1
- float 속성으로 인해 부유 현상을 없애주는 속성이다.
- clear: none // 기초값으로 clear를 설정하지 않은 것과 같다.
- clear: left // left 외쪽 float를 취소
- clear: right // right 오른쪽 float를 취소 
- clear: both // 오른쪽 왼쪽을 취소 
```
* CSS 스프라이트(CSS Sprites)를 설명하고, 페이지나 사이트를 어떻게 향상하는지 설명하세요.
* Image Replacement를 사용해야 할 때, 선호하는 기술과 언제 사용하는지를 설명해주세요.
* 브라우저 스펙 차이에 따른 스타일링 이슈를 수정하기 위해서 어떻게 접근하나요?
* 기능이 제약된 브라우저를 위해서 어떤 방식으로 페이지를 만드나요?
* 어떠한 기술과 절차를 거치는지 설명하세요.
* 시각적으로 보이지 않고 스크린 리더에서만 가능하게 하는 방법에 관해 설명해주세요.
* 그리드 시스템(Grid system)을 사용한 적이 있나요? 있다면 어떠한 것을 선호하나요?
* 미디어 쿼리(media queries)를 사용한 적이 있나요? 혹은 모바일에 맞는 layout과 CSS를 사용한 적이 있나요?
* SVG를 스타일링하는데 익숙하신가요?
* 인쇄하기 위해 웹페이지를 어떻게 최적화 하나요?
* 효율적인 CSS를 작성하기 위한 "비법(gotchas)"은 어떤 게 있나요?
* CSS 전처리(CSS preprocessors)를 사용해보셨나요?
    * 그렇다면, 사용 경험에 기반을 둬 좋았던 점과 나빴던 점을 설명해주세요.
* 페이지에서 표준 폰트가 아닌 폰트 디자인을 사용할 때 어떤 방식으로 처리하시나요? (웹폰트를 제외하고)
* CSS Selector가 어떠한 원리로 동작하는지 설명해주세요.
* pseudo-elements에 관해서 설명하고 어디에서 사용되는지 이야기해보세요.
* box model에 관해 설명하고 브라우저에서 어떻게 동작하는지 설명해주세요.
* { box-sizing: border-box; }은 무엇이고 사용했을때 이점은 무엇인가요?
* 기억나는 display 속성에 대한 값들을 나열해보세요.
* inline과 inline-block의 차이점은 무엇인가요?
* 요소를 배치하는 방법(relative, fixed, absolute, static) 간의 차이는 무엇인가요?
* CSS에서 'C'는 Cascading을 의미합니다. Cascading에 관해서 설명해주세요. 또 cascading system의 장점은 무엇인가요?
* CSS framework를 사용해본 적이 있으신가요? 실무에서 사용해보았다면 어떤 이점이 있었나요?
* 새로운 CSS Flexbox 혹은 Grid 스펙을 사용해 보신 적 있나요?
* 반응형(Responsive) 디자인은 적응형(Adaptive) 디자인과 어떤 차이점이 있나요?
* 레티나 그래픽 환경에서 작업해 보신 적이 있나요? 하셨다면 어떤 기술을 사용하셨나요?
* 절대 좌표대신 translate() 혹은 반대로 사용하는 이유가 있나요? 있다면 이유에 관해서 설명해주세요.
