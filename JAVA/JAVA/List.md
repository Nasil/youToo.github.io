```java
System.out.println("==========LIST 종류=========");
List<String> list = new ArrayList<String>(30); // default 10
List<String> listV = new Vector<String>();
List<String> linked = new LinkedList<String>();

// 입력
list.add("Test0"); // 중복 가능
listV.add("Test0"); // 중복 가능
linked.add("Test0"); // 중복 가능
for (int i = 0; i < MAX_LIST; i++) {
    String str = "Test" + i;
    list.add(str);
    listV.add(str);
    linked.add(str);
}

// 출력
int size = list.size();
for (int i = 0; i < size; i++) {
    System.out.println(list.get(i));
}

// 삭제
list.remove(2); // index 로 삭제
list.remove(2);
list.remove("Test0"); // value 로 삭제


// 출력
System.out.println("=== 삭제 ===");
size = list.size();
for (int i = 0; i < size; i++) {
    System.out.println(list.get(i));
}

// 고정 List
System.out.println("==========asList=========");
List<String> asList = Arrays.asList("test0", "test1", "test2");

// 출력
for (String name : asList) {
    System.out.println(name);
}
```
