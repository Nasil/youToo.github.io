# instanceOf 
- instanceOf 연산자는 객체가 어떤 클래스인지, 어떤 클래스를 상속받았는지 확인하는데 사용하는 연산자입니다.


### a instanceof Object
- 모든 클래스는 Object를 상속하기 때문에 object instanceOf Object는 항상 true를 리턴합니다.

### null instanceof Object
- object가 null이라면 instanceOf는 항상 false를 리턴합니다.

### Generics의 instanceOf
- ArrayList<String>처럼 Generic으로 생성된 객체도 동일하게 instanceOf로 타입을 체크할 수 있습니다.
- Generic 클래스 내에서 T와 같은, 타입이 결정되지 않은 상태에서 instanceOf로 타입 체크는 할 수 없습니다. T는 컴파일 과정에서 실제 타입으로 변경되기 때문입니다.
  
### class 체크
```
if (src instanceof java.math.BigDecimal) // 성능이 더 좋음
  
if (src.getClass().getName().equals("java.math.BigDecimal")) // 객체를 생성해서 class 명을 알아내는게 더 느릴수 있음
```
