```java
public class EmployeeTO implements Serializable {
    
    // Serializable : 서버 사이의 데이터 전송이 가능, 원격지 서버에 데이터를 전송하거나, 파일로 객체를 저장할 경우 이 인터페이스 구현

    private String empName;

    public EmployeeTO(String empName) {
        this.empName = empName;
    }

    public String getEmpName() {
        if (empName == null) return ""; // null 인경우도 string 반환 되도록 개발하는게 좋음
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    @Override
    public String toString() { // 데이터 전송용인 경우 필수로 만들어두는 것이 좋음
        return "EmployeeTO{" +
                "empName='" + empName + '\'' +
                '}';
    }
}
```
