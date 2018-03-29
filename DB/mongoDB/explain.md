# db.collection.explain() 각 항목 설명


<pre>
<code>
인덱스 조회 :
mongos> db.system.indexes.find()
</code>
</pre>

## queryPlanner
**explain.queryPlanner**
> queryPlanner정보는 쿼리 최적화 프로그램에서 선택한 계획을 자세히 설명합니다. <br/>
> 공유되지 않은 컬렉션의 explain경우 다음 정보를 반환합니다. <br/>
> 쿼리 최적화 프로그램 에서 쿼리 계획을 선택하는 방법에 대한 정보가 들어 있습니다. <br/>
> mongos> db.getCollection('test').find({"name" : "mandy"}).explain();

+ explain.queryPlanner.namespace  <br/>
<database>.<collection> 쿼리가 실행될 네임 스페이스를 지정하는 문자열입니다.

+ explain.queryPlanner.indexFilterSet  <br/>
MongoDB 가 쿼리 모양에 인덱스 필터를 적용하는지 여부를 지정하는 boolean 값입니다.

+ explain.queryPlanner.winningPlan  <br/>
쿼리 최적화 프로그램에서 선택한 계획을 자세히 설명하는 문서입니다. <br/> 
MongoDB는 계획을 트리 단계로 제시합니다.  <br/>
예를 들어, 스테이지에는 inputStage 또는 스테이지에 여러 개의 자식 스테이지가있을 수 있습니다.

+ explain.queryPlanner.winningPlan.stage  <br/>
각 단계는 해당 단계와 관련된 정보로 구성됩니다. <br/>
예를 들어 IXSCAN 스테이지에는 인덱스 스캔과 관련된 다른 데이터와 함께 인덱스 범위가 포함됩니다. <br/>
스테이지에 자식 스테이지 또는 여러 자식 스테이지가있는 경우 스테이지에 inputStage 또는 inputStages가 있습니다.
 > ex )   <br/>
 > **IDHACK** for a _id index keys <br/>
 > **COLLSCAN** for a collection scan  <br/>
 > **IXSCAN** for scanning index keys  <br/>
 > **FETCH** for retrieving documents  <br/>
 > **SHARD_MERGE** for merging results from shards  <br/>

+ explain.queryPlanner.winningPlan.inputStage  <br/>
부모에게 문서 또는 색인 키를 제공하는 하위 단계를 설명하는 문서입니다. 부모 단계에 자식이 하나만 있는 경우 필드가 있습니다.

+ explain.queryPlanner.winningPlan.inputStages  <br/>
자식 스테이지를 설명하는 문서 배열입니다. 하위 단계는 문서 또는 색인 키를 상위 단계에 제공합니다.  <br/> 
부모 단계에 자식 노드가 여러 개 있는 경우 필드가 있습니다.  <br/> 
예를 들어, $ 또는 표현식 또는 색인 교차에 대한 단계 는 여러 소스의 입력을 사용합니다.

+ explain.queryPlanner.rejectedPlans  <br/>
쿼리 최적화 프로그램에서 고려하고 거부 한 후보 계획의 배열입니다. 다른 후보 계획이 없으면 배열을 비울 수 있습니다. <br/> 
샤드 드 컬렉션의 경우, 성공한 계획에는 shards액세스 된 각 샤드의 계획 정보가 들어있는 배열이 포함됩니다. <br/> 
자세한 내용은 Sharded Collection을 참조하십시오 . <br/> 

## executionStats
**explain.queryPlanner** <br/>
 > 반환 된 executionStats정보에는 당첨 된 계획의 실행 내용이 자세히 설명되어 있습니다. <br/>
 > 결과에 나타나기 위해서는 executeStats 또는 allPlansExecution 상세 표시 모드로 Explain을 실행 해야합니다. <br/>
 > mongos> db.getCollection('test').find({"name" : "mandy"}).explain("executionStats"); <br/>
 > mongos> db.getCollection('test').find({"name" : "mandy"}).explain("allPlansExecution"); <br/>
 > 공유되지 않은 컬렉션의 explain경우 다음 정보를 반환합니다. <br/>

+ explain.executionStats <br/>
성공한 계획에 대해 완료된 쿼리 실행을 설명하는 통계를 포함합니다. 쓰기 작업의 완료 쿼리 실행은 수정을 의미 할 수행 할 수 있지만 않습니다 <br/>
하지만 데이터베이스에 수정 사항을 적용 할 수 있습니다.

+ explain.executionStats.nReturned <br/>
쿼리 조건과 일치하는 문서 수입니다. <br/>
이전 버전의 MongoDB에서 반환 한 필드에 nReturned해당합니다 

+ explain.executionStats.executionTimeMillis <br/>
쿼리 계획 선택 및 쿼리 실행에 필요한 총 시간 (밀리 초)입니다. <br/>
이전 버전의 MongoDB에서 반환 한 필드에 executionTimeMillis해당합니다 

+ explain.executionStats.totalKeysExamined <br/>
검색된 색인 항목 수. 이전 버전의 MongoDB에서 반환 한 필드에 totalKeysExamined해당합니다.

+ explain.executionStats.totalDocsExamined <br/>
스캔 한 문서 수. 이전 버전의 MongoDB에서는 이전 버전의 MongoDB에서 반환 된 필드에 totalDocsExamined 해당합니다.

+ explain.executionStats.executionStages <br/>
단계별 트리로 당첨 된 계획의 완료된 실행을 상세하게 표시합니다. 즉 무대는 1 inputStage또는 복수를 가질 수 있습니다  <br/>
각 스테이지는 스테이지와 관련된 실행 정보로 구성됩니다.

+ explain.executionStats.executionStages.works <br/>
쿼리 실행 단계에서 수행되는 "작업 단위"의 수를 지정합니다. 쿼리 실행은 작업을 작은 단위로 나눕니다.  <br/>
"작업 단위"는 단일 색인 키를 검사하거나 컬렉션에서 단일 문서를 가져 오거나 단일 문서에 투영을 적용하거나 내부 부기를 수행하는 것으로 구성 될 수 있습니다.

+ explain.executionStats.executionStages.advanced <br/>
이 단계에서 상위 단계 로 반환되거나 진행된 중간 결과 수입니다 .

+ explain.executionStats.executionStages.needTime <br/>
중간 단계에서 상위 단계로 나아 가지 않은 작업주기 수입니다 <br/>
예를 들어, 인덱스 스캔 단계는 인덱스 키를 반환하는 것과 달리 인덱스에서 새로운 위치로 탐색하는 작업주기를 보낼 수 있습니다. <br/>
이 작업주기는 explain.executionStats.executionStages.needTime 으로 계산됩니다

+ explain.executionStats.executionStages.needYield <br/>
저장소 계층에서 쿼리 시스템에서 잠금을 요청한 횟수입니다.

+ explain.executionStats.executionStages.isEOF <br/>
실행 단계가 스트림의 끝에 도달했는지 여부를 지정합니다. <br/>
true또는 1실행 스테이지가 스트림의 끝 부분에 도달 한 경우 false또는의 경우 0스테이지에 여전히 결과가 표시 될 수 있습니다. <br/>
예를 들어, 실행 스테이지 가 쿼리 LIMIT에 IXSCAN대한 입력 스테이지가 있는 스테이지로 구성된 제한이있는 쿼리를 생각해보십시오.  <br/>
쿼리가 지정된 한도를 초과하여 반환하면 LIMIT스테이지 가보고되지만 기본 스테이지가보고됩니다.

+ explain.executionStats.allPlansExecution <br/>
승패 계획 모두에 대해 계획 선택 단계 에서 수집 된 부분 실행 정보가 포함 됩니다. 이 필드는 자세한 표시 모드로 실행될 때만 나타납니다.


> https://docs.mongodb.com/v3.0/reference/explain-results/ 한국어 번역 
