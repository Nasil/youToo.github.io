## 기본 명령어
> show dbs // DB 목록 확인 </br>
> show collections // 컬렉션 확인 </br>
> use admin //  </br>
> sh.status(); // shard 확인  </br>
> db.system.indexes.find({"ns":"db_name.collection_name"}) // Index 확인</br> 
> db.getCollection('collection_name').getIndexes(); // Index 확인</br>
> db.runCommand({"buildinfo":1}) //환경구성</br>
> Object.bsonsize('쿼리'); // 다큐먼트 크기 </br>
> db.getCollection('collection_name').find({"id" : "hello"}).explain("executionStats"); // 실행계획</br>
> db.runCommand({"collStats":"collection_name"}) // 통계데이터</br>
> db.collection_name.stats() // 통계데이터</br>
## 기타
> it // find 한 결과가 20줄이 넘어가는 경우 


- mongoDB client 프로그램
https://www.mongodb.com/download-center#compass
