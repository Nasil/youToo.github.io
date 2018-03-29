# MongoDB Index :smile:

인덱스는 MongoDB에서 효율적인 쿼리 실행을 지원합니다. 인덱스가 없다면, MongoDB는 콜렉션 스캔을 수행해야합니다
쿼리에 적절한 인덱스가 존재하면 MongoDB는 인덱스를 사용하여 검사해야하는 문서 수를 제한 할 수 있습니다

인덱스 항목의 정렬은 효율적인 일치 일치 및 범위 기반 쿼리 작업을 지원합니다. 또한 MongoDB는 인덱스에서 정렬을 사용하여 정렬 된 결과를 반환 할 수 있습니다.

근본적으로 MongoDB의 인덱스는 다른 데이터베이스 시스템의 인덱스와 유사합니다. MongoDB는 컬렉션 레벨에서 인덱스를 정의하고 MongoDB 컬렉션에있는 문서의 모든 필드 또는 하위 필드에 대한 인덱스를 지원합니다.

## _id
모든 MongoDB의 collection 들은 _id 인덱스를 기본적으로 가지고 있습니다.

응용 프로그램에서 _id 값을 지정하지 않으면 드라이버 나 mongod가 ObjectId 값이있는 _id 필드를 만듭니다.

_id 인덱스는 고유하며 클라이언트가 _id 필드에 대해 동일한 값을 갖는 두 개의 문서를 삽입 할 수 없도록합니다.

## Single Index (단일 인덱스)
MongoDB 의 _id 인덱스 외에도 MongoDB는 문서의 단일 필드에 사용자 정의 오름차순 / 내림차순 색인을 지원합니다.

단일 필드 색인 및 정렬 조작의 경우 색인 키의 정렬 순서 (즉, 오름차순 또는 내림차순)는 중요하지 않습니다. MongoDB가 색인을 어느 방향 으로든 탐색 할 수 있기 때문입니다.

    ## db.friends.createIndex( { "name" : 1 } )

## Compound Index (복합 인덱스)
MongoDB는 또한 여러 필드에서 사용자 정의 인덱스를 지원합니다

복합 인덱스는 모든 인덱스 필드에서 일치하는 쿼리를 지원할뿐만 아니라 인덱스 필드의 접두사와 일치하는 쿼리를 지원할 수 있습니다. 즉, 인덱스는 항목 필드뿐만 아니라 항목 및 주식 필드에 대한 쿼리를 지원합니다.
<pre><code>
db.products.find( { item: "Banana" } )
db.products.find( { item: "Banana", stock: { $gt: 5 } } )
</code></pre>


복합 색인에 나열된 필드의 순서는 중요합니다.
 예를 들어, 복합 색인이 {userid : 1, score : -1}로 구성된 경우 색인은 먼저 userid별로 정렬 한 다음 각 사용자 ID 값 내에서 score 순으로 정렬합니다

    ## Sort in Compound Index
    Index : { a: 1, b: 1, c: 1, d: 1 }
    db.data.find( { a: 5, b: { $lt: 3} } ).sort( { b: 1 } )
    ㄴ Index Prefix  { a: 1, b: 1 }
    db.data.find( { a: { $gt: 2 } } ).sort( { c: 1 } )
    ㄴ These operations will not efficiently use the index. May not use Index retrieve
    db.data.find( { c: 5 } ).sort( { c: 1 } )
    ㄴ These operations will not efficiently use the index. May not use Index retrieve


## Multikey Index (멀티키 인덱스)

MongoDB는 멀티 키 인덱스를 사용하여 배열에 저장된 컨텐트를 색인화합니다.

배열 값을 저장하는 필드를 색인하면 MongoDB는 배열의 모든 요소에 대해 별도의 색인 항목을 생성합니다

이러한 다중 키 인덱스를 사용하면 쿼리가 배열의 요소 또는 요소를 일치시켜 배열이 포함 된 문서를 선택할 수 있습니다.

MongoDB는 인덱싱 된 필드에 배열 값이 포함되어 있으면 멀티 키 인덱스를 만들지 여부를 자동으로 결정합니다. 명시 적으로 멀티 키 유형을 지정할 필요가 없습니다.

    ## db.inventory.createIndex({ "stock.size": 1, "stock.quantity": 1 })
    
    
https://docs.mongodb.com/v3.0/core/indexes-introduction/
:bug:
