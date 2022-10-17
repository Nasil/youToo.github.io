# Singleton 패턴

- 싱글톤 패턴은 인스턴스를 불필요하게 생성하지 않고 오직 한개의 인스턴스만 생성하여 사용되는 디자인패턴
- 즉, 생성자의 호출이 반복적으로 이루어져도 실제로 생성되는 객체는 최초 생성된 객체를 반환해주는것이다.

#### Lazy Instantiation
- 멀티스레드 상황에서 실행시 인스턴스가 두개 만들어질수 있음
```
public class Singleton {
	private static Singleton uniqueInstance;
	private Singleton(){}
	public static Singleton getInstance(){
		if (uniqueInstance == null){
			uniqueInstance = new Singleton();
		}

		return uniqueInstance;
	}
 }
```

#### Synchronized Instantiation
- 쓰레드가 synchronized 되어있는 곳에서 작업하고 있다면 다른 쓰레드가 접근하지 못하도록 lock 걸어줌
- getInstance() 메소드를 synchronized로 처리하면 멀티 쓰레드의 동시 접근에 대한 문제는 해결
- 이 방법은 매번 인스턴스를 리턴 받을 때마다 쓰레드를 동기화하기 때문에 성능 저하가 생긴다는 단점
```
public class Singleton {
    private static Singleton uniqueInstance;
    private Singleton(){}
    public static synchronized Singleton getInstance(){
        if (uniqueInstance == null){
            uniqueInstance = new Singleton();
        }
        return uniqueInstance;
    }
}
```

#### Eager initialization
- 쓰레드가 getInstance()를 호출하는 시점이 아닌, Class가 로딩되는 시점 즉, static 영역의 데이터 로딩시점에 인스턴스를 생성하기 때문에 하나의 인스턴스만 생성되는 것을 보장
- 미리 만들어 놓은 인스턴스를 리턴하기만 하면 되니까 이 방법은 Thread-safe하며 소스도 간결하고 성능 역시 좋다.
- 이 방법은 인스턴스를 미리 만들어놓기 때문에 인스턴스를 사용하지 않는다면 메모리 낭비에 불과하다는 단점이 있다.
```
public class Singleton {

    private static Singleton instance = new Singleton();

    private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```

#### DCL(Double Checked Locking) 싱글톤 패턴
- DCL 싱글톤 패턴은 static 필드에 volatile 키워드를 써야 자바 1.5 이상부터 동작하는 DCL 기법이 완성된다.
- 메소드 레벨에 synchronized가 있지 않기 때문에 호출할 때마다 synchronized 걸리지 않고,
- 인스턴스가 이미 존재한다면 synchronized를 쓰지 않기 때문에 성능 이슈를 피할 수 있다.
- 인스턴스를 필요로 하는 시점에 만들 수 있다는 장점
```
public class Singleton {

    private volatile static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

#### Lazy Holder 싱글톤 패턴 (현시점에서 가장 완벽하다고 평가 받고 있음)
- Lazy initialization 방식을 가져가면서 쓰레드간 동기화문제를 동시에 해결한다.
- 중첩클래스 SingletonHolder는 getInstance() 메소드가 호출되기 전에는 참조 되지 않으며,
- 최초로 getInstance() 메소드가 호출될 때 클래스로더에 의해 Singleton 인스턴스를 생성하여 리턴한다.
- SingletonHolder 내부 인스턴스는 static 이기 때문에 클래스 로딩 시점에 한 번만 호출된다는 점을 이용한 것이며,
- final을 사용해 다시 값이 할당되지 않도록 한다.
- volatile이나 synchronized 같은 키워드가 없어도 Thread-safe 하면서 성능도 보장하는 아주 훌륭한 방법이다.
```
public class Singleton {

    private Singleton() {}

    //inner class
    private static class SingletonHolder {
        private static final Singleton INSTANCE = new Singleton();
    }

    public static Singleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```

## 동등 비교 
```
Singleton obj1 = Singleton.getInstance();
Singleton obj2 = Singleton.getInstance();

if (obj1 === obj2) { // 동일
```

참조 : https://dev-coco.tistory.com/m/109
