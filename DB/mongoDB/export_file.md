## 몽고 DB 결과문을 파일로 보내는 방법 

### 1. json 파일로 저장 하는 방법  
- mongo_query.js 저장 
```
var cursor = db.getCollection('person').find({"name" : "mandy", "age" : "15"});
 
while(cursor.hasNext()) {
 printjson(cursor.next()); // json 데이터로 출력 
}
```
- 명령어 실행 
```
mongo --quiet mongo_query.js > select_mongo.json
```

### 2. csv 파일로 저장 하는 방법  
- export.js 로 저장 
```
print("name,id,email");
db.User.find().forEach(function(user){
  print(user.name+","+user._id.valueOf()+","+user.email);
});
```
- 명령어 실행 
```
mongo test export.js > out.csv
```
