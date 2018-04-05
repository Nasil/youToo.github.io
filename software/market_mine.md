
```php
class appProductMarketAbstract implement appProductMarketInstance
{
  protected $oUtil;

  public function getRegister() {
     $this->mapping();
     $this->send();
     $this->update();
  }
  
  public function getModify() {
      $this->mapping();
     $this->send();
     $this->update();
  }
  
  public function getSellingStop() {
      $this->mapping();
      $this->send();
      $this->update();
  }
  
  public function send() {
    if (skipSend() === true) {
      return;
    } 
    
    //업데이트로직수행
  }
  
  public function mapping() {
    // mapping market data
  }
  
  public function update() {
    // update DB
  }
}
```
```php

class appProductMarketAuction extends apappProductMarketAbstract
{
    public static function instance()
    {
        self::$oUtil = appProductMarketDecoMappingAuction::instance();

        return utilSplClass::load(__CLASS__);
    }
}

```

