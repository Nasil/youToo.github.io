```java
Set<String> set = new HashSet<String>();

set.add("Test0"); // 중복 불가

// 입력
for (int i = 0; i < MAX_LIST; i++) {
    String str = "Test" + i;
    set.add(str);
}

int size = set.size();

System.out.println("==== SET 조회 ===");
Iterator<String> iterator = set.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

System.out.println("==== SET 삭제 ==="); 
set.remove("Test0");
set.remove("Test1");
iterator = set.iterator();
while (iterator.hasNext()) {
    System.out.println(iterator.next());
}

System.out.println("==== SET 전체비움 ===");
set.clear();
if (set.isEmpty()) {
    System.out.println("비어있음");
}
```
