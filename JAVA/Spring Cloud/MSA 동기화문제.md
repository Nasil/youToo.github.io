
# MSA 동기화 이슈
- 같은 서비스를 분산처리(lb) 했을 경우 동기화 문제가 발생된다


### 해결방법1) db 를 하나로 쓴다
```
order-service:60001
                     <=> DB
order-service:60002
```

### 해결방법2) message queing server 사용
```
order-service:60001  => DB1  
                             <=> kafka
order-service:60002   => DB2
```

### 해결방법2) db 를 하나 + message queing server 
```
order-service:60001
                      ==> kafka => DB
order-service:60002 
```
