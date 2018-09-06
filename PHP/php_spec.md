## PHP Version
- php 5.3 => namespace, use, 익명함수, closer
- php 5.4 => trait
- php 7 => 


## Function
- php 는 일급함수 (fist-class function)을 지원합니다
- 함수가 변수에 할당 될 수 있음
- 사용자 정의함수, 내장함수 모두 변수에 의해서 참조될수 있고 동적으로 호출될수 있다.
- 함수는 다른 함수의 인자로 전달될수 있고 함수가 다른 함수를 리턴하는 것도 가능합니다.

```
<?php
$input = array(1, 2, 3, 4, 5, 6);

// 익명 함수를 하나 만들어서 변수에 대입
$filter_even = function($item) {
    return ($item % 2) == 0;
};

// array_filter 내장 함수는 배열과 함수를 인자로 받는다.
$output = array_filter($input, $filter_even);

// 익명 함수를 변수에 할당해서 전달할 필요없이 이렇게 하는 것도 가능하다.
$output = array_filter($input, function($item) {
    return ($item % 2) == 0;
});

print_r($output);
```
