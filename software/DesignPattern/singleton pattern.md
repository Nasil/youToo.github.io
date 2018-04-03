# Singleton 패턴

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
- 시간이 매우 느려질수 있음 
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
