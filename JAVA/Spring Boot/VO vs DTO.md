# VO(Value Object)
- 데이터 그 자체로 의미 있는 것을 담고 있는 객체이다.
- DTO와 동일한 개념이나 차이점은 Read–Only 속성 객체이다.
- 간단한 독립체(Entity)를 의미하는 작은 객체를 의미한다. 
- 관계데이터베이스의 레코드에 대응되는 자바클래스이다.

### 특징
- 도메인 오브젝트로 설계한 Entity 또는 VO 클래스에는 getter/setter/property 사용을 지양해 상태노출을 최소화 하라는 지침이다.
- 객체지향 프로그래밍의 핵심 개념 중 캡슐화를 지키면서 객체에 메시지를 보내 스스로 상태에 대한 처리로직을 수행하도록 하라는 의미이다.
- 이 지침은 데이터 전달을 목적으로 하는 DTO나 프로세스 처리를 목적으로 하는 컨트롤러, 서비스 빈 클래스를 대상으로 하지 않는다.
- 객체지향 프로그래밍은 객체의 '역할과 책임' 이라는 핵심 가치를 잘 유지할 때 그 의미가 살아난다. 이 역할과 책임의 대한 의의는 객체가 자신의 상태, 즉 정보에 대한 처리책임을 자신 스스로 가진다는 데 있다.
- 간단히 말해서 객체가 가진 정보는 꺼내서 다른 객체가 처리할 것이 아니라 '객체 스스로 처리'해야 한다는 것이다. 이 처리에 대한 명령(메소드)을 호출하는 것을 메시지를 전달한다고 표현할 수 있다.
```java
@Entity
@Getter
//@Setter // VO 나 ENTITY 클래스에서는 setter 지양
public class OrderItem {

    @Id
    @GeneratedValue
    @Column(name = "order_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private int orderPrice; // 주문당시의 가격
    private int count; // 주문 수량

    // 생성 메서드 (객체가 가진 정보는 꺼내서 다른 객체가 처리할 것이 아니라 '객체 스스로 처리')
    public static OrderItem createOrderItem(Item item, int orderPrice, int count) {
        OrderItem orderItem = new OrderItem();
        orderItem.item = item;
        //orderItem.setItem(item);
        orderItem.orderPrice = orderPrice;
        //orderItem.setOrderPrice(orderPrice);
        orderItem.count= count;
        //orderItem.setCount(count);
        item.removeStock(count); // 주문 item을 생성하면서 재고를 차감

        return orderItem;
    }

    // 비지니스 로직
    public void cancel() {
        getItem().addStock(count);
    }

    public int getTotalPrice() {
        return getOrderPrice() * getCount();
    }
}
```



참조)
-https://limdingdong.tistory.com/15
-https://ijbgo.tistory.com/9
