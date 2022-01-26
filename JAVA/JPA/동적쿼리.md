# CriteriaBuilder
```java
public List<Order> findAll(OrderSearch orderSearch) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Order> cq = cb.createQuery(Order.class);
        Root<Order> o = cq.from(Order.class);
        Join<Order, Member> m = o.join("member", JoinType.INNER); // 회원과 조인

        List<Predicate> criteria = new ArrayList<>();

        if (orderSearch.getOrderStatus() != null) {
            Predicate status = cb.equal(o.get("status"), orderSearch.getOrderStatus());
            criteria.add(status);
        }

        if (StringUtils.hasText(orderSearch.getMemberName())) {
            Predicate name = cb.like(m.<String>get("name"), "%" + orderSearch.getMemberName() + "%");
            criteria.add(name);
        }

        cq.where(cb.and(criteria.toArray(new Predicate[criteria.size()])));
        TypedQuery<Order> query = em.createQuery(cq).setMaxResults(1000);

        // 정적 쿼리
//        return em.createQuery("select o from Order o join o.member m where o.status = :status and m.name like :name", Order.class)
//                .setParameter("status", orderSearch.getOrderStatus())
//                .setParameter("name", orderSearch.getMemberName())
//                .setFirstResult(1) // paging
//                .setMaxResults(100) // limit
//                .getResultList();

        return query.getResultList();
    }
```
