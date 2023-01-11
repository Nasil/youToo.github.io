# 카프카
- 카프카 설치 : https://kafka.apache.org/downloads
- Kafka와 데이터를 주고받기 위해 사용하는 java lib
    - https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients
- 다양한 3rd party lib 존재
    - https://cwiki.apache.org/confluence/display/KAFKA/Clients
 

- 실행
```
./zookeeper-server-start.bat ../../config/zookeeper.properties
./kafka-server-start.bat ../../config/server.properties
```

- 토픽 실행
```
./kafka-topics.bat --bootstrap-server localhost:9092 --list
./kafka-topics.bat --bootstrap-server localhost:9092 --create --topic quick-event --partitions 1
./kafka-topics.bat --bootstrap-server localhost:9092 --describe --topic quick-event
```

- producer 실행
```
 ./kafka-console-producer.bat --broker-list localhost:9092 --topic quick-event
```
- consumer 실행
```
./kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic quick-event --from-beginning
```
