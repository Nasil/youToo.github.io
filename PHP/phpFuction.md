## PHP Version
- php 5.3 => namespace, use, 익명함수, closer
- php 5.4 => trait
- php 7 => 


## Function
- php 는 일급함수 (fist-class function)을 지원합니다
- 함수가 변수에 할당 될 수 있음
- 사용자 정의함수, 내장함수 모두 변수에 의해서 참조될수 있고 동적으로 호출될수 있다.
- 함수는 다른 함수의 인자로 전달될수 있고 함수가 다른 함수를 리턴하는 것도 가능합니다.


## 익명함수
http://php.net/functions.anonymous
```php
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

## 클로저
- 클로저(clouser)는 전역(global) 변수를 사용하지 않고도 클로저 바깥 스코프에 있는 변수들에 접근할 수 있는 익명 함수입니다. 
- 이론적으로 클로저는 클로저가 정의될 때 환경에 의해서 고정된 몇몇 인자를 받는 함수라고 볼 수 있습니다. 
- 클로저를 사용하면 깔끔한 방법으로 변수의 스코프 제한을 넘을 수 있습니다.
```php
<?php
/**
 * $min 보다 큰 항목만 걸러내는 익명 필터 함수를 만든다.
 */
function criteria_greater_than($min)
{
    return function($item) use ($min) {
        return $item > $min;
    };
}

$input = array(1, 2, 3, 4, 5, 6);

// 동적으로 만들어낸 필터 함수를 array_filter 에 전달해서 입력을 필터링한다.
$output = array_filter($input, criteria_greater_than(3));

print_r($output); // 3보다 큰 숫자만 출력된다.
```
- $min 변수를 클로저에 들여올 때는 초기 바인딩(early binding)이 사용됩니다. (역주: 클로저가 만들어질 때 $min 변수가 클로저 스코프로 “복사”되어서 이후에 외부의 $min 값이 변경되어도 클로저의 $min은 변경되지 않습니다.) 
- 지연 바인딩(late binding)을 사용하는 클로저를 만들려면 변수를 클로저로 들여올 때 참조를 사용해야합니다(‘use’에서 변수에 참조를 사용). 
- 웹 어플리케이션 개발 시에 PHP를 이용한 템플릿을 만들거나 입력 검증 라이브러리를 만들 때 클로저를 이용한 익명 함수가 사용되었다고 한다면, 클로저를 정의할 때 캡처한 변수의 값은 나중에 익명 함수가 호출될 때 읽어와서 사용해야 합니다.

## 내장 함수
http://php.net/functions.anonymous
```
<?php

namespace Foobar;

class Foo {
    static public function test($name) {
        print "Hello {$name}!\n";
    }
}

// As of PHP 5.3.0
call_user_func_array(__NAMESPACE__ .'\Foo::test', array('Hannes')); // Hello Hannes!

// As of PHP 5.3.0
call_user_func_array(array(__NAMESPACE__ .'\Foo', 'test'), array('Philip')); // Hello Philip!

```
