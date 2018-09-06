# PSR (PHP Standard Recommendation)

## PSR-0
- autoloader를 통해 클래스를 손쉽게 로딩 
- PSR-4가 제정 되면서 무효화 (php 5.4이상)

## PSR-1 명명 규칙 
- 표준 코딩 스타일 
- php 파일은 BOM(Byte Order Mark) 없는 UTF-8 인코딩 사용
- 네임스페이스와 클래스는 오토로딩 표준 (PSR-0, PSR-4) 를 따를 것 
- 클래스 이름은 반드시 첫 대문자로 할 것
- 클래스내 상수는 반드시 모두 대문자로 작성하고 구분자로 _ 를 사용할것 
- 클래스내 메소드의 이름은 반드시 카멜케이스(camelCase)를 사용할것

## PSR-2 코딩 스타일 
- 들여쓰기는 tab 대신 4칸의 공백 사용
- 닫는 태그는 (?>) 사용하지 않음
- namespace 선언 뒤엔느 한줄 공백을 사용하고 여러개의 use 는 공백없이 사용후에 마지막 블록 뒤에 한줄의 공백을 사용 할것 
- 클래스 구문의 여는 괄호는 다음줄에 사용하고 닫는 괄호는 본문 다음 줄에 사용 할것
- 메소드 구문의 여는 괄호는 다음줄에 사용하고 닫는 괄호는 본문 다음 줄에 사용 할 것 
- abstrct 와 final 은 모든 메소드와 프로퍼티에 명시적으로 사용하고 제일 먼저 와야 하며, static 구문은 그 후에 위치 시키기 
- if 나 elseif 는 제어문 뒤에 한칸의 공백을 두고 그 후에 괄호를 사용하고 조건문을 기술 할것.
- 함수 호출이나 메소드 호출은 메소드명 뒤에 공백이 있으면 안됨
- if 나 elseif 는 제어 관련 구문의 여는 괄호는 제어문과 같은 줄에 위치해야함. 닫는 괄호는 본문의 다음 줄에 위치 
```
<?php
namespace Vendor\Package;
  
use FooInterface;
use BarClass as Bar;
  
class Foo extends Bar implements FooInterface
{
    public function sampleFunction($a, $b = null)
    {
        if ($a === $b) {
            bar();
        } elseif ($a > $b) {
            $foo->bar($arg1);
        }
    }
}
```

## PSR-3 로깅 표준
- Psr\Log\LoggerInterface 인터페이스를 정의하고 이를 구현하도록 하고 있습니다
- 로깅 장치(파일, 소켓, 데이타베이스등)에 상관없이 애플리케이션 로그를 남기기 위한 표준입니다. 
- 다른 로깅 프레임워크를 사용해도 애플리케이션 수정이 없도록 Psr\Log\LoggerInterface 인터페이스를 정의하고 이를 구현하도록 하고 있습니다. 
- debug, info, notice, warning, error, critical, alert, emergency, log 총 아홉 개의 메소드를 지정하고 있으며 9번째 메소드인 log 를 제외하고 레벨에 따라 해당 메소드를 호출하면 됩니다.
- log 메소드는 파라미터로 레벨을 지정할 수 있도록 정의되어 있습니다. PSR-3 를 구현한 가장 유명한 PHP 라이브러리는 
- MonoLog(https://github.com/Seldaek/monolog) 로 다음과 같이 로그 객체를 만들고 로그를 기록할 수 있습니다.
```php
<?php
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
 
// create a log channel
$log = new Logger('name');
$log->pushHandler(new StreamHandler('path/to/your.log', Logger::WARNING));
 
// add records to the log
$log->addWarning('Foo');
$log->addError('Bar');
라라벨은 모노로그를 지원하며 간편한 레이어를 제공하므로 다음과 같이 간단하게 사용할 수 있습니다.

Log::warning('Foo');
Log::error('Bar');
```

## PSR-4 오토로더 
- PSR-0을 대체하는 새로운 오토로딩 표준입니다.
- FQCN(Fully Qualified Class Name) 을 규정하고 있음
- 컴포저는 vendor/autoload.php 파일을 생성 해주므로 개발자는 한줄만 추가하면 됨 
```
<?php
require 'vendor/autoload.php';
```
- 여기에서 NamespaceName 은 최상위 네임스페이스(일반적으로 회사명이나 개인의 id 를 사용합니다)를 설정하고 SubNamespaceNames 은 하위 네임스페이스를 ClassName 은 클래스 이름을 입력합니다.
로깅 프레임워크인 MonoLog 의 경우 다음과 같이 네임스페이스를 사용하고 있습니다. 
```
<?php
namespace Monolog\Handler;
  
class FilterHandler extends AbstractHandler
{
```    
- 네임스페이스는 실제 디렉터리에 일치하며 최종 php 소스 파일은 클래스명.php 로 존재하게 됩니다.
- 예로 FilterHandler를 구현한 파일은 src/Monolog/Handler/FilterHandler.php 에 위치하게 됩니다.

## PSR-7
- PHP에서 HTTP 에서 데이터를 주고 받기 위한 클래스와 메소드, 인터페이스 등을 정의한 규약입니다.
- PSR-7 을 구현한 라이브러리중 유명한 제품으로는 아마존이 후원하는 guzzle(https://github.com/guzzle/guzzle) 이 있으며 AWS(Amazon Web Service) 의 PHP SDK 는 guzzle 을 사용하여 HTTP 를 처리하고 있습니다.

## 참고  
- 코드 스니퍼  
- http://modernpug.github.io/php-the-right-way/
