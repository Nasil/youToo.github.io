

```php
abstrct class Save {
  protected function getProduct() {
  }
  
  protected function getPost() {
  }
  
  protected function getApi() {
  }
  
  protected abstract mapping();
}
```

```php
public class LocalSaveV1 extends Save {
  //@Override
  protected mapping() {
    // mapping 
 }
}
```
```php
public class LocalSaveV2 extends Save {
  //@Override
  protected mapping() {
    // mapping 
 }
}
```

```php
abstract class SuperFactory {
  abstract saveProduct($sType);
}
```

```php
public class ProductFactory extends SuperFactory {
  //@Override
  function saveProduct($sType) {
    switch($sType) {
      case "v1" : return new LocalSaveV1();
      case "v2" : return new LocalSaveV2(); 
    }
    return null;
  }

}
```

- main
```php

  public $oLocal1;
  public $oLocal2;
  public $oLocal3;

  public function run() {
    SuperFactory pf = new ProductFactory();
    Save local1 = rf.saveProduct("local");
    Save local2 = rf.saveProduct("local2");
    Save local3 = rf.saveProduct("local3");

    
    local1.mapping();
  }
```

