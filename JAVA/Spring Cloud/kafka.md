# 카프카
- 카프카 설치 : https://kafka.apache.org/downloads
- Kafka와 데이터를 주고받기 위해 사용하는 java lib : https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients
- 다양한 3rd party lib 존재 : https://cwiki.apache.org/confluence/display/KAFKA/Clients
- 카프카 설치 및 커넥터 연동 참조)
    - https://cjw-awdsd.tistory.com/53
    - https://conkjh032.tistory.com/458 (윈도우 설치 에러 팁)
    - gradle 의 경우 implementation 후 java 실행시 나오는 첫줄에 mariadb-java-client-3.0.9.jar 위치 나오는것 참조
    ```
    implementation 'org.mariadb.jdbc:mariadb-java-client'
    ```
    - http://localhost:8083/connector-plugins 로 설치된 플러그인 확인 가능
 
 
 # 간단 명령어 (for Window)
- Zookeeper 및 kafka 서버 구동
```
./bin/windows/zookeeper-server-start.bat ./config/zookeeper.properties
./bin/windows/kafka-server-start.bat ./config/server.properties
```
- Topic 생성
```
./bin/windows/kafka-topics.bat --create --topic quickstart-events --bootstrap-server localhost:9092 --partitions 1
```
- Topic 목록 확인
```
./bin/windows/kafka-topics.bat --bootstrap-server localhost:9092 --list
```
- Topic 정보 확인
```
./bin/windows/kafka-topics.bat --describe --topic quickstart-events --bootstrap-sever localhost:9092
```
- 메시지 생산 테스트
```
./bin/windows/kafka-console-producer.bat --broker-list localhost:9092 --topic quickstart-events
```
- 메시지 소비 테스트 
```
./bin/windows/kafka-console-consumer.bat --bootstrap-server localhost:9092 --topic quickstart-events --from-beginning
```
