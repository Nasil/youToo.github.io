- hover iframe
- https://codepen.io/iamjordanlittle/pen/GozEKY


```
<body>

  <iframe id=“iframeA” src=“test.html”></iframe>

</body>
```

### ifrme 이 있는지 mouse hover가 될때 찾기
```
// ifrme 체크
$('iframe').hover(function () {
    console.log($(this)[0].id);
}, function () {});
```

### iframe 접근
```
window.frames.length; // 1

window.frames[0].document; // iframe의 window의 document객체

document.getElementById('iframeA'); // iframe 엘리먼트

document.getElementById('iframeA').contentWindow.document; // iframe의 window의 document객체

$('iframe').get(1).id
$('iframe').get(1).name

```

### iframe객체의 window
```
$('iframe').get(0).contentWindow   // window

// iframe객체의 document

$('iframe').get(0).contentDocument // document

// 또는 

$('iframe').get(0).contentWindow.document   // document
```


### 부모html에서 자식iframe 함수 실행
```
$('#iframe').get(0).contentWindow.함수명;

$('#iframe')[0].contentWindow.함수명;
```


### 부모html에서 자식iframe 변수접근
```
$('#iframe').get(0).contentWindow.변수명;
```


### 부모html에서 자식iframe 접근, 제어  // jQuery
```
$('#iframe').contents().find('#foo').text('안녕하세요');
```

### 자식iframe에서 부모 html 변수, 함수 호출
```
window.parent.변수명; // 한단계 부모  // 그렇다면 두단계 부모는??  window.parent.parent.변수명
window.top.변수명; // 최상위 부모 // html(최상위) -> iframe -> iframe - iframe(자식) (여기에서 top을 쓰면 최상위 부모로 접근, parent를 쓰면 바로위 iframe에 접근)
```

### iframe 이전페이지로
```
$('iframe').get(0).contentWindow.history.go(-1);      
```


### iframe 새로고침
```
$('iframe').get(0).contentDocument.location.reload();
```

### iframe 로드
```
$('iframe').load(function(){    // iframe이 모두 load된후 제어
    $(this).contents().find('body');
});
```

### 자식iframe에서 부모html의 다른 iframe에 접근
```
$('제어할 아이디', parent.frames["부모창 제어할 frame의 name값"].document).html("여기도 제어한다.");
```

### 자식iframe에서 부모html 접근 (최상위 부모html에 접근된다.)
```
$('부모창 제어할 아이디', parent.document).contents().find('body').html(); // $('부모창 제어할 아이디', parent.document) -> $('#ID이름',top.document)로 변경해도 된다.
```

### 팝업창에서는??? opener
```
$("#id",opener.document).css("display","none");
```

### 현재창이 iframe인지 여부 확인
```
// self는 iframe
// top은 self를 포함하는 부모페이지(최상위)
console.log(self == top)
```

### html -> iframe -> iframe -> iframe 이런 구조일 경우
```
// 자식iframe 한단계 윗 부모html(iframe)에 접근하기
window.frameElement     // iframe   또는  this.frameElement 
.parentNode                // 부모 
<div>
    <iframe src="sub.html"></iframe>
</div> 
window.frameElement.parentNode // 자식iframe을 감싸는 부모는 div가 된다.

if(!window.frameElement){ console.log('최상위 프레임'); }  // 요소(node)가 iframe이 아닐경우에는 최상위(root)부모 html 이다.

```

### 부모에서 -> 자식 iframe body에 걸려있는 이벤트 trigger("이벤트명", "전달객체")
```
$('#iframe2')[0].contentWindow.$('body').trigger('eventEvnt', {"a": "홍길동"});

document.getElementById('iframe2').contentWindow.$('body').trigger('eventEvnt', {"a": "홍길동"});     
```

### 자식에서 -> 부모 iframe body에 걸려있는 이벤트 trigger("이벤트명", "전달객체")
```
// this.$('div')   // 이런개념 this(window)는 생략 가능하므로.. 다른 iframe에선 명시적으로 (top, parent)앞에 붙여준다.
top.$('body').trigger('eventname', {"a" : "홍길동"});            // 최상위 iframe 접근 (root개념)
parent.$('body').trigger('eventname', {"a" : "홍길동"});         // 한단계 위 부모 iframe 접근
parent.parent.$('body').trigger('eventname', {"a" : "홍길동"});  // 두단계 위 부모 iframe 접근
```

### 부모에 jQuery 가 로딩되어 있다면 굳이 다시 로딩 할 거 없이 이렇게 
```
(function($, f) { 

    $(function() { 

        $(f).closest('form').find('[name=image]').val("test"); 

    }); 

})(parent.jQuery, window.frameElement); 
```

### 속성줄때 
```
.appendTo($('#ID이름', parent.document))       // 이렇게하면 ID를 못찾는다

.appendTo($(top.document).find("# ID이름"));  // 이런식으로 속성주면 된다
```

- 출처: http://mylife365.tistory.com/10 [변화에 적응하기]
