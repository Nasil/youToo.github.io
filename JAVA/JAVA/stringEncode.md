```java
System.out.println("UTF-8 -> EUC-KR        : " + new String(msgName.getBytes("UTF-8"), "EUC-KR"));
System.out.println("UTF-8 -> KSC5601       : " + new String(msgName.getBytes("UTF-8"), "KSC5601"));
System.out.println("UTF-8 -> X-WINDOWS-949 : " + new String(msgName.getBytes("UTF-8"), "X-WINDOWS-949"));
System.out.println("UTF-8 -> ISO-8859-1    : " + new String(msgName.getBytes("UTF-8"), "ISO-8859-1"));
System.out.println("UTF-8 -> MS949         : " + new String(msgName.getBytes("UTF-8"), "MS949"));
 
System.out.println("ISO-8859-1 -> EUC-KR        : " + new String(msgName.getBytes("ISO-8859-1"), "EUC-KR"));
System.out.println("ISO-8859-1 -> KSC5601       : " + new String(msgName.getBytes("ISO-8859-1"), "KSC5601"));
System.out.println("ISO-8859-1 -> X-WINDOWS-949 : " + new String(msgName.getBytes("ISO-8859-1"), "X-WINDOWS-949"));
System.out.println("ISO-8859-1 -> UTF-8         : " + new String(msgName.getBytes("ISO-8859-1"), "UTF-8"));
System.out.println("ISO-8859-1 -> MS949         : " + new String(msgName.getBytes("ISO-8859-1"), "MS949"));
 
System.out.println("EUC-KR -> UTF-8         : " + new String(msgName.getBytes("EUC-KR"), "UTF-8"));
System.out.println("EUC-KR -> KSC5601       : " + new String(msgName.getBytes("EUC-KR"), "KSC5601"));
System.out.println("EUC-KR -> X-WINDOWS-949 : " + new String(msgName.getBytes("EUC-KR"), "X-WINDOWS-949"));
System.out.println("EUC-KR -> ISO-8859-1    : " + new String(msgName.getBytes("EUC-KR"), "ISO-8859-1"));
System.out.println("EUC-KR -> MS949         : " + new String(msgName.getBytes("EUC-KR"), "MS949"));
 
System.out.println("KSC5601 -> EUC-KR        : " + new String(msgName.getBytes("KSC5601"), "EUC-KR"));
System.out.println("KSC5601 -> UTF-8         : " + new String(msgName.getBytes("KSC5601"), "UTF-8"));
System.out.println("KSC5601 -> X-WINDOWS-949 : " + new String(msgName.getBytes("KSC5601"), "X-WINDOWS-949"));
System.out.println("KSC5601 -> ISO-8859-1    : " + new String(msgName.getBytes("KSC5601"), "ISO-8859-1"));
System.out.println("KSC5601 -> MS949         : " + new String(msgName.getBytes("KSC5601"), "MS949"));
 
System.out.println("X-WINDOWS-949 -> EUC-KR     : " + new String(msgName.getBytes("X-WINDOWS-949"), "EUC-KR"));
System.out.println("X-WINDOWS-949 -> UTF-8      : " + new String(msgName.getBytes("X-WINDOWS-949"), "UTF-8"));
System.out.println("X-WINDOWS-949 -> KSC5601    : " + new String(msgName.getBytes("X-WINDOWS-949"), "KSC5601"));
System.out.println("X-WINDOWS-949 -> ISO-8859-1 : " + new String(msgName.getBytes("X-WINDOWS-949"), "ISO-8859-1"));
System.out.println("X-WINDOWS-949 -> MS949      : " + new String(msgName.getBytes("X-WINDOWS-949"), "MS949"));
                
System.out.println("MS949 -> EUC-KR        : " + new String(msgName.getBytes("MS949"), "EUC-KR"));
System.out.println("MS949 -> UTF-8         : " + new String(msgName.getBytes("MS949"), "UTF-8"));
System.out.println("MS949 -> KSC5601       : " + new String(msgName.getBytes("MS949"), "KSC5601"));
System.out.println("MS949 -> ISO-8859-1    : " + new String(msgName.getBytes("MS949"), "ISO-8859-1"));
System.out.println("MS949 -> X-WINDOWS-949 : " + new String(msgName.getBytes("MS949"), "X-WINDOWS-949"));
```

참조 : https://huskdoll.tistory.com/74
