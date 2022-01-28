# 성능 최적화 쿼리 방식 선택 권장 순서
1. 우선 엔티티를 DTO로 변환하는 방법을 선택한다.
2. 필요하면 페치 조인으로 성능을 최적화 한다. 대부분의 성능 이슈가 해결된다.
3. 그래도 안되면 DTO로 직접 조회하는 방법을 사용한다.
4. 최후의 방법은 JPA가 제공하는 네이티브 SQL이나 스프링 JDBC Template을 사용해서 SQL을 직접 사용한다.

# N+1 문제 최적화 하는 방법 

```java
public List<Order> findAllWithItem() {
        // 페치 조인으로 SQL이 1번만 실행됨 (lazy 이지만 한번에 불러오게됨)

        // distinct 를 사용한 이유는 1대다 조인이 있으므로 데이터베이스 row가 증가한다. 
        // 그 결과 같은 order 엔티티의 조회 수도 증가하게 된다.
        
        // JPA의 distinct는 SQL에 distinct를 추가하고, 더해서 같은 엔티티가 조회되면, 애플리케이션에서 중복을 걸러준다. 
        // 이 예에서 order가 컬렉션 페치 조인 때문에 중복 조회 되는 것을 막아준다.

        // 페이징 불가능
        return em.createQuery(
                "select distinct o from Order o" +
                        " join fetch o.member m" +
                        " join fetch o.delivery d" +
                        " join fetch o.orderItems oi" +
                        " join fetch oi.item i", Order.class).getResultList();

    }

```

```java
/**
 * xToOne(ManyToOne, OneToOne) 관계 최적화
 * Order
 * Order -> Member
 * Order -> Delivery
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class OrderSimpleApiController {
    private final OrderRepository orderRepository;

    /**
     * V1. 엔티티 직접 노출
     */
    @GetMapping("/v1/simple-orders")
    public List<Order> orderV1() {

        //문제1) json 리턴하면서 리턴 데이터를 조회하는데 Members 에도 Orders 에도 서로 있어서 무한루프 걸림
        //해결1) JsonIgnore 해줘야함
        / 엔티티를 직접 노출할 때는 양방향 연관관계가 걸린 곳은 꼭! 한곳을 @JsonIgnore 처리 해야 한다. 안그러면 양쪽을 서로 호출하면서 무한 루프가 걸린다.

        //문제2) 에러남
        //order member 와 order address 는 지연 로딩이다. 따라서 실제 엔티티 대신에 프록시(ByteBuddy) 존재.
        //jackson 라이브러리는 기본적으로 이 프록시 객체를 json으로 어떻게 생성해야 하는지 모름 예외 발생.
        //해결2) Hibernate5Module 을 스프링 빈으로 등록하면 해결(스프링 부트 사용중)
        //참고) 앞에서 계속 강조했듯이 정말 간단한 애플리케이션이 아니면 엔티티를 API 응답으로 외부로 노출하는 것은 좋지 않다. 따라서 Hibernate5Module 를 사용하기 보다는 DTO로 변환해서 반환하는 것이 더 좋은 방법이다

        List<Order> all = orderRepository.findAll(new OrderSearch());

        //해결3)
        for (Order order : all) {
            order.getMember().getName(); //Lazy 강제 초기화
            order.getDelivery().getAddress(); //Lazy 강제 초기화
        }

        //주의: 지연 로딩(LAZY)을 피하기 위해 즉시 로딩(EARGR)으로 설정하면 안된다!
        //즉시 로딩 때문에 연관관계가 필요 없는 경우에도 데이터를 항상 조회해서 성능 문제가 발생할 수 있다. 즉시 로딩으로 설정하면 성능 튜닝이 매우 어려워 진다.
        //항상 지연 로딩을 기본으로 하고, 성능 최적화가 필요한 경우에는 페치 조인(fetch join)을 사용해라!(V3에서 설명)

        return all;
    }

    /**
     * V2. 엔티티를 조회해서 DTO로 변환(fetch join 사용X)
     * - 단점: 지연로딩으로 쿼리 N번 호출
     */
    @GetMapping("/v2/simple-orders")
    public ListResponse orderV2() {
        List<Order> orders = orderRepository.findAll(new OrderSearch());
        List<SimpleOrderDto> collect = orders.stream()
                .map(order -> new SimpleOrderDto(order))
                .collect(Collectors.toList());

        // 성능 별루
        // 1) order 조회 1번
        // 2) order -> member 지연 로딩 N 번
        // 3) order -> delivery 지연로딩 N 번
        // 최악의 경우  1 + N + N 번 실행됨 (v1과 쿼리수 같음) 
        // 왜 최악이냐면 지연로딩은 영속성 컨텍스트에서 조회하므로, 이미 조회 된 경우(조건이 같을경우) 쿼리 생략됨.

        return new ListResponse(collect);
    }

    @GetMapping("/v3/simple-orders")
    public ListResponse orderV3() {
        List<Order> orders = orderRepository.findAllWithItem();
        List<SimpleOrderDto> collect = orders.stream()
                .map(order -> new SimpleOrderDto(order))
                .collect(Collectors.toList());

        return new ListResponse(collect);
    }

    @Data
    @AllArgsConstructor
    static class ListResponse<T> {
        private T data;
    }

    @Data
    static class SimpleOrderDto {
        private Long orderId;
        private String name;
        private LocalDateTime orderDate; //주문시간
        private OrderStatus orderStatus;
        private Address address;

        public SimpleOrderDto(Order order) { // DTO 보여줄 정보만
            orderId = order.getId();
            name = order.getMember().getName();
            orderDate = order.getOrderDate();
            orderStatus = order.getStatus();
            address = order.getDelivery().getAddress();
        }
    }
}
```
