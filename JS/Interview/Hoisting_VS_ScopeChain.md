JS 는 함수 단위로 변수(var)를 관리한다 (let, const 제외)

- 함수 단위로 변수를 관리합니다.
```javascript
var a = 1;
function f () {
    if(true) {
        var c = 2;
    }
    
    console.log(c); //2가 출력
    
    return c;  
}
```
- 중복 선언이 가능합니다
```javascript
function c () {
    var a = "첫번째 a";
    var a = "두번째 a";
    
    return a;
}
 
console.log(c()); //"두번째 a"가 출력
```
- 실행시의 변수관리는 렉시컬(lexical) 영역을 기준으로 함수를 실행 단계가 아닌 정의단계에서 유효범위를 설정하고 있습니다.
```javascript
var x = "global";
function f () {
    alert(x);            //undefined 출력
    
    var x = "local";    //지역변수 "local" 선언
    
    alert(x);            //"local" 출력
}

```

- 호이스팅
```javascript
var name = "Richard";
// 아래의 if문은 name변수에 대한 지역-범위를 생성하지 않습니다.
if (name) {
     name = "Jack";
     console.log(name); // Jack : 전역 변수
}
// name은 여전히 전역변수이며 if문에서 변경되었습니다.
console.log(name); // Jack
```
