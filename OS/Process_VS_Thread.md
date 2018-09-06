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

## Thread
- 스레드는 프로세스에서 동작하는 여러 실행의 흐름입니다.
- 기본적으로 프로세스당 최소 1개의 스레드를 가지고 있고 그것을 메인 스레드라고 합니다.
- 프로세스는 1개 이상의 스레드를 가질수 있으며 멀티스레드라고 합니다.
- 위에서 설명한 Context Switching은 사실 프로세스가 가지고 있는 스레드를 처리하는 과정입니다.
- 스레드는 프로세스 내에서 각각 Stack만 따로 할당을 받고 Code, Data, Heap 영역을 공유합니다.
![](https://magi82.github.io/images/2017-2-6-process-thread/03.png)

## 참조 
- https://magi82.github.io/process-thread/
