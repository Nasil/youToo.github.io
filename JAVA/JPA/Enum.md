
## 필수 어노테이션 
```
@Enumerated(EnumType.STRING)
private DeliveryStatus deliveryStatus;
```

## 종류
- @Enumerated(EnumType.ORDINAL)
- @Enumerated(EnumType.STRING)

## 특징
- ORDINAL로 설정 후 Gender enum 타입이 변경된다면 예기치 못한 문제가 발생할 수 있기도 하고
- STRING 설정은 문자열 자체가 저장되기 때문에 DB 공간 낭비가 발생한다.
- 이를 대체할 수 있는 좋은 방법은 converter 를 사용하는 것이다.
- https://lng1982.tistory.com/279
