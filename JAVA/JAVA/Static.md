# Static 
- 클래스로더가 클래스(바이트코드)를 로딩해서 메소드 메모리 영역에 적재할때 클래스 별로 관리. 
- 클래스 로딩되면 바로 사용 가능
- 외부에서 사용시 클래스명. 으로 호출
```java
static double pi = 3.14159; // 정적 필드 초기화
static int field1; // 정적필드
static void method1(); // 정적메소드
int field2;
void method2();
static { // 정적 블록
    field1 = 10; 
    mothod1(); 
    field2 = 10; // static 이 아닌 필드 초기화 불가
    method2(); // static 이 아닌 메소드 호출 불가
}
```

# 정적 팩토리 메서드
- 캐싱
- enum과 같이 자주 사용되는 요소의 개수가 정해져있다면 해당 개수만큼 미리 생성해놓고 조회(캐싱)할 수 있는 구조로 만들수 있다. 
- 정적 팩터리 메서드와 캐싱구조를 함께 사용하면 매번 새로운 객체를 생성할 필요가 없어진다
```java
public class LottoNumber {
  private static final int MIN_LOTTO_NUMBER = 1;
  private static final int MAX_LOTTO_NUMBER = 45;

  private static Map<Integer, LottoNumber> lottoNumberCache = new HashMap<>();

  static {
    IntStream.range(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER)
                .forEach(i -> lottoNumberCache.put(i, new LottoNumber(i)));
  }

  private int number;

  private LottoNumber(int number) {
    this.number = number;
  }

  public LottoNumber of(int number) {  // LottoNumber를 반환하는 정적 팩토리 메서드
    return lottoNumberCache.get(number);
  }

  ...
}
```
- 하위 클래스 호출
```java
public class Level { // Basic, Intermediate, Advanced 클래스가 Level라는 상위 타입을 상속받고 있는 구조
  ...
  public static Level of(int score) { // 하위 호출
    if (score < 50) {
      return new Basic();
    } else if (score < 80) {
      return new Intermediate();
    } else {
      return new Advanced();
    }
  }
  ...
}
```
- entity -> DTO 변환
```java
public class CarDto {
  private String name;
  private int position;

  pulbic static CarDto from(Car car) {
    return new CarDto(car.getName(), car.getPosition());
  }
}


// Car -> CatDto 로 변환
CarDto carDto = CarDto.from(car); // 정적 팩토리 메서드를 쓴 경우
//CarDto carDto = new CarDto(car.getName(), car.getPosition); // 생성자를 쓴 경우 다 내용을 드러내야함
```


- https://tecoble.techcourse.co.kr/post/2020-05-26-static-factory-method/ 참조 
