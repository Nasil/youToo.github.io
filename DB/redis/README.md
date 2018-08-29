- http://bcho.tistory.com/654
- Redis 공식 문서 -  http://redis.io/documentation
- Redis Monitoring Tool - http://charsyam.wordpress.com/2012/06/20/redis-monitoring-tool-redislive-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0/
- Redis Common Use Case -  http://highscalability.com/blog/2011/7/6/11-common-web-use-cases-solved-in-redis.html
- 웹기반 redis Test 콘솔 - http://try.redis-db.com/ (IE 브라우져에서 동작 안될때 많음, 크롬 권장)
- redis presentation - http://simonwillison.net/static/2010/redis-tutorial/



# 레디스 명령어

- keys : 현재의 키값 들을 확인하는 명령어.
```
> keys *
```
http://redis.io/commands/keys

- set : 키/값을 저장하는 명령어.
```
> set key value
```

- get : 키에 해당하는 값을 가져오는 명령어.
```
> get key
"value"
```
http://redis.io/commands/get

- del : 키와 해당하는 값을 삭제하는 명령어. 여러개의 키값을 지우는 dels 가 없다.
```
> del key
(integer) 1
```
http://redis.io/commands/del


- Hash 구조체
```
 Person 클래스
class Person {
    int id;
    string name;
    string pw;
    int uniqueNumber;
}
Person person = 
    new Person { "id" = 1234, name = "tom", pw = "abcd5678", uniqueNumber = 56000 };

> hmset user id 1234 name tom pw abcd5678 uniqueNumber 56000;
OK
> hget user
(error) ERR wrong number of arguments for 'hget' command
> hmget user id
1) "1234"
127.0.0.1:6379> hgetall user
1) "id"
2) "1234"
3) "name"
4) "tom"
5) "pw"
6) "abcd5678"
7) "uniqueNumber"
8) "56000;"
```

http://redis.io/commands/hset
http://redis.io/commands/hmset
