# 프로세스 vs 스레드
- 프로세스는 운영체제로부터 자원을 할당받는 작업의 단위이다.
- 스레드는 할당 받은 자원을 지용하는 실행의 단위이고, 프로세스 내에 여러개 생길 수 있다
- 어플리케이션 하나가 프로세스 이고, 그 안에서 분기 처리가 스레드가 되는 셈이다. 
- 운영체제 작업 단위 > 프로세스 > 실행 단위 스레드

## 멀티 프로세스 vs 멀티 스레드
- 멀티프로세스 : 하나의 프로그램을 여러개의 프로세스로 구성하여 각 프로세스가 하나의 작업(task)를 처리하는것
- 장점 : 하나의 프로세스가 잘못 되어도 프로그램은 동작 함
- 단점 : context switching 비용 발생
- 멀티스레드 : 프로그램을 여러개의 쓰레드로 구성하고 각 쓰레드가 작업(task) 처리하는 것
- 장점: 시스템 자원 소모 감소, 처리 비용 감소(실행 속도 향상), 쓰레드간 자원 공유(stack 영역)
- 단점: 디버깅 어려움, 동기화 이슈 발생, 하나의 쓰레드의 오류로 전체 프로세스에 문제 발생 

# Process 
- 멀티태스킹 : 운영체제에서 여러개의 프로세스를 동시에 실행 하는 것을 멀티태스킹.
- 멀티프로세싱 : 어떤 작업을 하나이상의 프로세스에서 병렬로 처리하는 것을 멀티프로세싱 이라고 함.

## Multi Processing
- 프로세스는 프로그램 실행시 Code, Data, Stack, Heap의 구조로 되어있는 독립된 메모리 영역을 할당 받습니다.
![](https://magi82.github.io/images/2017-2-6-process-thread/01.png)
- 멀티 프로세싱의 방식은 CPU에서 여러 프로세스를 로테이션으로 돌면서 처리를 하게 됩니다.(스케쥴링 알고리즘)
- 동작중인 프로세스가 대기를 타면서 해당 프로세스의 상태(Context)를 보관하고,
- 대기하고 있던 다음 순번의 프로세스가 동작하면서 이전에 보관했던
- 프로세스의 상태(Context)를 복구하게 됩니다.
- 이러한 일련의 과정을 Context Switching 이라고 하는데 프로세스는 각각 독립된 메모리 영역이다
- 보니 캐쉬 메모리 초기화 등 꽤나 무거운 작업이 진행되고 오버헤드가 발생하게 됩니다.

![](https://magi82.github.io/images/2017-2-6-process-thread/02.png)

## Multi Thread
- 스레드는 프로세스에서 동작하는 여러 실행의 흐름입니다.
- 기본적으로 프로세스당 최소 1개의 스레드를 가지고 있고 그것을 메인 스레드라고 합니다.
- 프로세스는 1개 이상의 스레드를 가질수 있으며 멀티스레드라고 합니다.
- 위에서 설명한 Context Switching은 사실 프로세스가 가지고 있는 스레드를 처리하는 과정입니다.
- 스레드는 프로세스 내에서 각각 Stack만 따로 할당을 받고 Code, Data, Heap 영역을 공유합니다.
![](https://magi82.github.io/images/2017-2-6-process-thread/03.png)

- 프로세스와는 달리 Code, Data, Heap 영역 메모리를 공유하다보니 Stack 영역만 처리를 하면 되고 그 결과 처리 비용이 감소하게 됩니다.
- 그리고 멀티프로세싱의 단점인 Context Switching의 오버헤드에 대한 부분을 해결해 줍니다.
- 더군다나 프로세스 Context Switching의 경우 캐쉬 메모리를 초기화 하게 되지만 스레드는 메모리를 공유하므로 꽤 큰 처리 비용이 드는 초기화를 할 필요가 없어집니다.


- 멀티 쓰레드 장점 
```
메모리 공유로 인한 시스템 자원 소모가 줄어 듭니다.
응답시간이 단축 됩니다.
Context Switching 에 대한 오버헤드가 줄어 듭니다.
```
- 멀티 쓰레드 단점
```
서로 데이터를 사용하다가 충돌이 일어날 가능성이 있습니다.
디버깅이 다소 까다로워 집니다. (버그 생성될 가능성 증가)
```

## 멀티쓰레드시 싱글톤 패턴 
- 하나의 인스턴스만 존재해야하는 경우 Singleton 패턴을 사용한다. 
- Multi Thread 환경에서 Thread-safe 하게 적용하고 싶은 경우
- 메서드에 Singleton 클래스의 getInstance() 메서드에 synchronized 키워드를 추가하는 건 역할에 비해서 동기화 오버헤드가 심하다고 생각한다.

1. Enum 방법
```
public enum Singleton {
  INSTANCE;  
}
```
- Enum은 인스턴스가 여러 개 생기지 않도록 확실하게 보장해주고 복잡한 직렬화나 리플렉션 상황에서도 직렬화가 자동으로 지원된다는 이점이 있다
- Enum의 초기화는 컴파일 타임에 결정이 되므로 매번 메서드 등을 호출할 때 Context 정보를 넘겨야 하는 비효율적인 상황이 발생할 수 있다. 
- 결론은 Enum은 효율적인 이디엄이지만 상황에 따라 사용이 어려울 수도 있다는 점이다.

2. LazyHolder
```
public class Singleton {
  private Singleton() {}
  public static Singleton getInstance() {
    return LazyHolder.INSTANCE;
  }
  
  private static class LazyHolder {
    private static final Singleton INSTANCE = new Singleton();  
  }
}
```
- 객체가 필요할 때로 초기화를 미루는 것이다. Lazy Initialization이라고도 한다. 
- Singleton 클래스에는 LazyHolder 클래스의 변수가 없기 때문에 Singleton 클래스 로딩 시 LazyHolder 클래스를 초기화하지 않는다. 
- LazyHolder 클래스는 Singleton 클래스의 getInstance() 메서드에서 LazyHolder.INSTANCE를 참조하는 순간 Class가 로딩되며 초기화가 진행된다. 
- Class를 로딩하고 초기화하는 시점은 thread-safe를 보장하기 때문에 volatile이나 synchronized 같은 키워드가 없어도 thread-safe 하면서 성능도 보장하는 아주 훌륭한 이디엄이라고 할 수 있다.

## 참조 
- https://magi82.github.io/process-thread/
