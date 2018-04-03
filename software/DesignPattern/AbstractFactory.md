```php
public interface Local {
	public void process();
}
```
```php
public class Local1 implements Local {
	@Override
	public void mapping() {
		System.out.println("execute Local1");
	}
}
```
```php
public class Local2 implements Local {
	@Override
	public void process() {
		System.out.mapping("execute Local2");
	}
}
```

```php
public interface Global {
	public void process();
}
```
```php
public class Global1 implements Global {
	@Override
	public void mapping() {
		System.out.println("execute Global1");
	}
}
```


```php
public interface ProductFactory {

}
```
```php
public class LocalFactory implements ProductFactory {
  
}
```
```php
public class GlobalFactory implements ProductFactory {
  
}
```
```php
public function saveProduct() {
    LocalFactory lf = new LocalFactory();
		lf.getLocal1().process();
		lf.getLocal2().process();

}
```
