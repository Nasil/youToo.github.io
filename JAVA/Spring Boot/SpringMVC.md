# Controller
### @RequestParam 
```java
@PostMapping(value = "/order")
// 식별자만 넘기는것을 추천 (jpa transaction 이 걸려야하기 때문에)
public String order(@RequestParam("memberId") Long memberId,
                    @RequestParam("itemId") Long itemId,
                    @RequestParam("count") int count) {

    Long orderId = orderService.order(memberId, itemId, count);
    //return "redirect:/orders/" + orderId;
    return "redirect:/orders";
}
```

### @RequestBody

### @ModelAttribute
```java
@GetMapping(value = "/orders")
public String orderList(@ModelAttribute("orderSearch") OrderSearch orderSearch, Model model) {

    List<Order> orders = orderService.findOrders(orderSearch);
    model.addAttribute("orders", orders);

    return "order/orderList";
}
```

### @PathVariable
```java
@PostMapping(value = "/orders/{orderId}/cancel")
public String cancelOrder(@PathVariable("orderId") Long orderId) {
    orderService.cancelOrder(orderId);

    return "redirect:/orders";
}
```
