# 카프카 설치 및 커넥터 연동
### 참조
- https://cjw-awdsd.tistory.com/53
- https://conkjh032.tistory.com/458 (윈도우 설치 에러 팁)
### 설치시 에러 해결 한 내용
- gradle 의 경우 implementation 후 java 실행시 나오는 첫줄에 mariadb-java-client-3.0.9.jar 위치 나오는것 참조
```
implementation 'org.mariadb.jdbc:mariadb-java-client'
```
- http://localhost:8083/connector-plugins 로 설치된 플러그인 확인 가능
- jdbc 에러 발생시 : https://wecandev.tistory.com/111
 
 
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


# Kafka connection
![connect](https://blog.kakaocdn.net/dn/zjEmA/btrp5zR8tDs/Bz9NYoKNgHJQknIjJGLaQK/img.png)
### Kafka source 등록
- 카프카 소스는 소스 시스템(예: 마리아DB의) 변경 내용을 카프카 토픽에게 전달.
-  [post] 127.0.0.1:8083/connectors
```
{
"name": "my-source-connect",
"config": {
    "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
    "connection.url": "jdbc:mariadb://localhost:3306/mydb",
    "connection.user": "root",
    "connection.password": "비번입력",
    "mode": "incrementing",
    "incrementing.column.name": "id",
    "table.whitelist": "mydb.users", // 에러 발생되어 추가
    "topic.prefix": "my_topic_",
    "tasks.max": "1"
    }
}
```
### Kafka sink 등록
```
{
    "name": "my-sink-connect",
    "config": {
        "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
        "connection.url": "jdbc:mariadb://localhost:3306/mydb",
        "connection.user": "root",
        "connection.password": "비번입력",
        "auto.create": "true",
        "auto.evolve": "true",
        "delete.enabled": "false",
        "tasks.max": "1",
        "topics": "my_topic_users"
    }
}
```
