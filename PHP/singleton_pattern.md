
## Singleton pattern

- 공유 자원에 대한 동시 액세스를 제어합니다.
- 자원에 대한 액세스는 시스템의 서로 다른 여러 부분에서 요청됩니다.
- 하나의 객체 만있을 수 있습니다.
- 공유 리소스를 관리해야 할 때 싱글 톤을 사용합니다. 
- 예를 들어 프린터 스풀러. 동일한 리소스에 대한 충돌하는 요청을 피하기 위해 응용 프로그램에는 스풀러 인스턴스가 하나만 있어야합니다.
- ex) 데이터베이스 연결 또는 파일 관리자 등


```
<?php

class SingletonDesignPattern {

    //just for demo there will be only one instance
    private static $instanceCount =0;

    //create the private instance variable
    private static $myInstance=null;

    //make constructor private so no one create object using new Keyword
    private function  __construct(){}

    //no one clone the object
    private function  __clone(){}

    //avoid serialazation
    public function __wakeup(){}

    //ony one way to create  object
    public static  function  getInstance(){

        if (self::$myInstance==null){
            self::$myInstance=new SingletonDesignPattern();
            self::$instanceCount++;
        }
        return self::$myInstance;
    }

    public static function getInstanceCount(){
        return self::$instanceCount;
    }

}

//now lets play with singleton design pattern
$instance = SingletonDesignPattern::getInstance();
$instance = SingletonDesignPattern::getInstance();
$instance = SingletonDesignPattern::getInstance();
$instance = SingletonDesignPattern::getInstance();

echo "number of instances: ".SingletonDesignPattern::getInstanceCount(); // 1

```



```
<?php

class Singleton{

    private static $data;

    function __construct(){
        if ($this::$data == null){
            $this->makeSingleton();
        }
        echo "<br/>".$this::$data;
    }

    private function makeSingleton(){
        $this::$data = rand(0, 100);
    }

    public function change($new_val){
        $this::$data = $new_val;
    }

    public function printme(){
        echo "<br/>".$this::$data;
    }

}


$a = new Singleton(); // 62
$b = new Singleton(); // 62
$c = new Singleton(); // 62

$a->change(-2);
$a->printme(); // -2
$b->printme(); // -2

$d = new Singleton(); // -2
$d->printme(); // -2




```
