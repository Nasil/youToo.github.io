
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
