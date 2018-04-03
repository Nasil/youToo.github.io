```php
public interface Version {
	public void process();
}
```
```php
public class Local1 implements Version {
	@Override
	public void process() {
		System.out.println("execute Local1");
	}
}
```
```php
public class Local2 implements Version {
	@Override
	public void process() {
		System.out.mapping("execute Local2");
	}
}
```
```php
public class Global1 implements Version {
	@Override
	public void process() {
		System.out.println("execute Global1");
	}
}
```


```php
public interface ProductFactory {
	public static function createObject($sStype)
}
```
```php
public class LocalFactory implements ProductFactory {
  	public static function createObject($sStype) {
		return new Local1();
	}
}
```
```php
public class GlobalFactory implements ProductFactory {
  	public static function createObject($sStype) {
		return new Global1();
	}
}
```
```php
public function saveProduct() {
    	LocalFactory lf = new LocalFactory();
	lf.createObject().process();
	
	GlobalFactory gf = new GlobalFactory();
	gf.createObject().process();

}
```
