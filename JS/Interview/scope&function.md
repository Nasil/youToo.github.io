


# 함수 단위로 변수를 관리
- JS 는 함수 단위로 변수(var)를 관리한다 (let, const 제외)
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
# 중복 선언이 가능
```javascript
function c () {
    var a = "첫번째 a";
    var a = "두번째 a";
    
    return a;
}
 
console.log(c()); //"두번째 a"가 출력
```
# 렉시컬(lexical) 영역
- 실행시의 변수관리는 렉시컬(lexical) 영역을 기준으로 함수를 실행 단계가 아닌 정의단계에서 유효범위를 설정
- var 의 선언 위치에 따라 그리고 중복 선언에 따라 undefined 가 되버림
```javascript
var name = "Michael Jackson";
function showCelebrityName() {
    console.log(name); // undefined
    var name = "Johnny Evers";
    console.log(name); // Johnny Evers
}
showCelebrityName();
```
```javascript
var name = "Michael Jackson";
function showCelebrityName() {
    console.log(name); // Michael Jackson
    name = "Johnny Evers";
    console.log(name); // Johnny Evers
}
showCelebrityName();
```
```javascript
var name = "Michael Jackson";
function showCelebrityName() {
    console.log(name); // Michael Jackson
    var age = "12";
    console.log(name); // Michael Jackson
    console.log(age); // 12
}
showCelebrityName();
```


# 호이스팅
```javascript
// 지역변수를 var키워드로 선언하지 않았을 경우, 그것은 전역-범위(global-scope)가 됩니다.
var name = "Michael Jackson";
function showCelebrityName() {
     console.log(name);
}
function showOrdinaryPersonName() {
     name = "Johnny Evers";
     console.log(name);
}
showCelebrityName(); // Michael Jackson
// name 은 지역변수가 아닙니다. 이것은 전역변수 name을 변경해 버립니다.
showOrdinaryPersonName(); // Johnny Evers
// 이제 전역변수 name은 Johny Evers입니다. 더이상, 셀럽의 이름은 없습니다. -.-;;
showCelebrityName(); // Johnny Evers
// 해결책은 지역변수 선언시 var 키워드를 사용하는 것입니다.
function showOrdinaryPersonName() {
     var name = "Johnny Evers"; // 이제 name은 항상 지역변수이며, 전역변수를 덮어쓰지 않습니다.
     console.log(name);
}
```
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

# 스코프 체인
- 하위함수에서 상위함수로의 부모/자식 관계가 정의된 것을 스코프 체인이라한다.
```
var a = 10;

function outFunc() {
    console.log(a); // 10
    var b = 2;
    function inFunc() {
        console.log(a+b); // 12
    }
    inFunc();
}

outFunc();
```
- outFunc 호출 하면 outFunc를 실행하면서 inFunc의 호출명령을 읽으면서 inFunc가 실행된다. inFunc 는 전역의 a, outFunc의 b 이용.
