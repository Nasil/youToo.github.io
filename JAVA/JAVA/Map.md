```
System.out.println("========== HASHMAP=========");
Map<Key, String> hashMap = new HashMap<Key, String>();
Map<String, String> hashTable = new Hashtable<String, String>();

// 입력
// 객체가 아닌 경우 key 중복 불가, value 중복 가능
// 객체인 경우 euqals 오버라이딩해서 key 중복 불가, value 중복 가능 만듬
hashMap.put(new Key(5), "test5");
hashMap.put(new Key(3), "test3");
hashMap.put(new Key(1), "test1");
hashMap.put(new Key(1), "test1");
hashMap.put(new Key(2), "test2");
hashMap.put(new Key(2), "test22");


int size = hashMap.size();
System.out.println(size); // 총 객체 갯수 (equals 가 있기때문에 2개, equals 없으면 4개)

// 찾기
String value = hashMap.get(new Key(1)); // new Key(1) 서로 다른 객체이지만 hashCode 와 equals 가 같기 때문에 찾을 수 있음
System.out.println(value);
System.out.println(new Key(1)); // 객체 입력시 toString 오버라이드 했기때문에
System.out.println(hashMap.hashCode());

// 순차 출력
Set<Key> keySet = hashMap.keySet();
Iterator<Key> keyItor = keySet.iterator(); // compareTo 오버라이딩 때문에 오름차순 정렬되어서 출력됨
while(keyItor.hasNext()) {
    Key key = keyItor.next();
    String value1 = hashMap.get(new Key(key.getNumber()));
    String value2 = hashMap.get(key);
    System.out.println(key.getNumber() + " " + value1 + " " + value2);
}

// entry set
Set<Map.Entry<Key, String>> entrySet = hashMap.entrySet();
Iterator<Map.Entry<Key, String>> entryIterator = entrySet.iterator();
while (entryIterator.hasNext()) {
    Map.Entry<Key, String> entry = entryIterator.next();
    Key key = entry.getKey();
    String val = entry.getValue();
    System.out.println(key.getNumber() + " " + val);
}

hashMap.clear();
if (hashMap.isEmpty()) {
    System.out.println("비어있음" + hashMap.size());
}


//============== hashTable =====================
hashTable.put("A", "111");
hashTable.put("B", "222");
hashTable.put("C", "333");

Scanner sc = new Scanner(System.in);

while (true) {
    System.out.println("아이디와 비번 입력");
    System.out.print("아이디 : ");
    String id = sc.nextLine();
    System.out.print("비밀번호 : ");
    String pwd = sc.nextLine();

    if (hashTable.containsKey(id)) {
        if (hashTable.get(id).equals(pwd)) {
            System.out.println("비번 일치");
            break;
        } else {
            System.out.println("비번 일치 안함");
        }
    } else {
        System.out.println("아이디 존재 안함");
    }
}
```
