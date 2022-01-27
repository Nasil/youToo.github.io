# Controller
### @RequestParam 
```java
@PostMapping(value = "/order")
// 식별자만 넘기는것을 추천 (jpa transaction 이 걸려야하기 때문에)
public String order(@RequestParam("memberId") Long memberId,
                    @RequestParam(value = "itemId", defaultValue = "111") Long itemId, // 
                    @RequestParam(value = "count", required = false) int count) {

    Long orderId = orderService.order(memberId, itemId, count);
    //return "redirect:/orders/" + orderId;
    return "redirect:/orders";
}
```
- 1개의 HTTP 파라미터를 얻기 위해 사용됨
- 필수여부 true 이기 때문에 기본적으로 반드시 해당 파라미터가 전송이 되어야 한다. 해당 파라미터가 전송이 되지 않으면 400 Error 발생됨 
- 중요한 변수가 아니라면 required 값을 false 로 설정 할수 있음. 해당 파라미터가 없을 경우 default value 옵션 설정 할수 있음

### @RequestBody
- JSON 형태의 HTTP Body 내용을 java object로 변환 해줌
- Body가 존재하지 않는 HTTP Get 메소드에 @RequestBody를 활용하려고 한다면 에러가 발생
- Spring은 메세지를 변환되는 과정에서 객체의 기본 생성자를 통해 객체를 생성하고, 내부적으로 Reflection을 사용해 값을 할당하므로 @RequestBody에는 값을 주입하기 위한 생성자나 Setter가 필요 없다
- @RequestBody로 받는 데이터는 Spring에서 관리하는 MessageConverter들 중 하나인 MappingJackson2HttpMessageConverte를 통해 Java 객체로 변환
- Json 데이터를 변환하기 위해서는 Jackson 라이브러리가 사용되는데, Jackson 라이브러리 내부적으로는 Getter나 Setter, @JsonInclude 등을 통해 필드에 있는 변수들의 이름을 찾고, Reflection을 이용해 값을 할당한다.

### @ModelAttribute
```java
@GetMapping(value = "/orders")
public String orderList(@ModelAttribute("orderSearch") OrderSearch orderSearch, Model model) {
// @ModelAttribute는 multipart/form-data 형태의 HTTP Body 내용과 HTTP 파라미터들을 1대1로 객체에 바인딩시킨다. 
// 만약 값을 주입해주는 생성자나 Setter함수가 없다면 매핑을 시키지 못하고, null을 갖게 된다.
    List<Order> orders = orderService.findOrders(orderSearch);
    model.addAttribute("orders", orders);

    return "order/orderList";
}
```
- 클라이언트가 전송하는 multipart/form-data 형태의 HTTP Body 내용과 HTTP 파라미터의 값들을 생성자나 Setter를 통해 주입하기 위해 사용
- @ModelAttribute에는 매핑시키는 파라미터의 타입이 객체의 타입과 일치하는지를 포함한 다양한 검증(Validiation) 작업이 추가적으로 진행 됨

### @PathVariable
```java
@PostMapping(value = "/orders/{orderId}/cancel")
public String cancelOrder(@PathVariable("orderId") Long orderId) {
    orderService.cancelOrder(orderId);

    return "redirect:/orders";
}
```
