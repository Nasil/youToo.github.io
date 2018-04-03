```php
interface Action {
    void getDB();
    void getCapi();
    void filter();
    void save();
}
```

```php
class SaveAction implements Action {
    public void getDB(Wheel wheel) {
    }
    public void getCapi(Engine engine) {
    }
    public void filter(Body body) {
    }
    public void save(Car car) {
    }
    
    // 다른부분
    public void getPost(Wheel wheel) {
    }
}
 
class SaveAllAction implements Action {
    public void getDB(Wheel wheel) {
    }
    public void getCapi(Engine engine) {
    }
    public void filter(Body body) {
    }
    public void save(Car car) {
    }
}
```

```php
interface version {
    public function run(Action action); // CarElements have to provide accept().
}
```

```php
class Local1 implements version {
    public function run(Action action) {
        action.run(this);
    }
}
```

```php
class Local2 implements version {
    public function run(Action action) {
        action.run(this);
    }
}
```

```php
class Global1 implements version {
    public function run(Action action) {
        action.run(this);
    }
}
```

```php
  Local1 L1 = new Local1();
  L1.run(new SaveAction);
  L1.run(new SaveAllAction);
```
