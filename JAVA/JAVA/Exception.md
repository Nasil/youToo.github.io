```java
import java.io.FileInputStream;
import java.io.IOException;

public class JavaTestException {

    public static void main(String[] args) {
        // Exception
        JavaTestException a = new JavaTestException();
        a.exceptionWithTest();

        // throws
        try {
            a.throwTest();
        } catch (ClassNotFoundException e) {
            System.out.println("Class not found 에러");
        }

        // 사용자 정의 exception
        try {
            a.throwMyExceptionTest();
        } catch (MyException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
        }

    }

    public void exceptionWithTest() {
        FileInputStream fiOld = null;

        // try - catch - finally (close)
        try {
            fiOld = new FileInputStream("file1.txt");
        } catch (Exception e) {
            System.out.println("알수 없는 에러 발생");
        } finally {
            if (fiOld != null) {
                try {
                    fiOld.close();
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                }
            }
        }

        // try - with - finally (close)
        try (MyFileInputStream fis = new MyFileInputStream("fil1.txt")) {
            int result = fis.read();
            if (result == 0) {
                throw new Exception("강제 exception");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void throwTest() throws ClassNotFoundException {
        Class a = Class.forName("TEST");
    }

    public void throwMyExceptionTest() throws MyException {
        throw new MyException("사용자 정의 예외처리");
    }

    /**
     * 사용자 정의 exception
     * ㄴ 네이밍은 마지막에 exception 붙이는 것이 일반적
     * ㄴ extends Exception, RuntimeException 둘중 하나
     * ㄴ 생성자만 선언하는 경우가 많음
     */
    public class MyException extends Exception {
        public MyException() {

        }

        public MyException(String message) {
            super(message);
        }

    }

    /**
     * 중첩 class (Nested Class)
     * ㄴ AutoCloseable 인터페이스가 있어야함
     */
    public class MyFileInputStream implements AutoCloseable {
        public String file;

        public MyFileInputStream(String file) {
            this.file = file;
        }

        public int read() {
            return 0;
        }

        @Override
        public void close() throws Exception {
            System.out.println("close 자동 실행");
        }
    }
}

```
