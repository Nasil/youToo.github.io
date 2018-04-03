http://jdm.kr/blog/116

## 컴포지트 패턴 
- 자기 클래스 및 자식 클래스를 한 함수에 매개체에 담는 방식 
- 요소를 표현할수 있는 인터페이스를 구현 
```
/**
Node 클래스는 기본적인 파일 및 디렉토리의 근간이라고 가정합니다.
모든 파일과 디렉토리는 이름을 가지고 있을테니 이름을 반환할 getName() 메소드를 가집니다.
*/
interface Node {
    public String getName();
}

/**
File 클래스는 Node 인터페이스를 구현하면 끝입니다. 자신은 자식 요소를 가질 필요가 없기 때문이죠.
*/
class File implements Node {
    private String name;
    // ...
    @Override
    public String getName(){ return name; }
}

/**
Directory 클래스는 Node 인터페이스를 구현하는 것 외에도 자식 요소를 담아둘 List가 필요합니다.
*/
class Directory implements Node {
    private String name;
    private List<Node> children;
    // ...
    @Override
    public String getName(){ return name; }
    public void add(Node node) {
        children.add(node);
    }
}
```
```
Directory dir = new Directory();
dir.add(new File()); // 디렉토리에 파일 하나를 삽입!
dir.add(new Directory()); // 디렉토리에 디렉토리를 삽입!
Directory dir2 = new Directory();
secondDir.add(dir2); // 기존 루트 디렉토리를 새로 만든 디렉토리에 삽입!
```


## 빌더 패턴 
- 불필요한 생성자를 만들지 않고 객체를 만든다.
- 데이터의 순서에 상관 없이 객체를 만들어 낸다.
- 사용자가 봤을때 명시적이고 이해할 수 있어야 한다.


## 팩토리 메소드 패턴 
- 클래스 간의 결합도를 낮추기 위하여 사용됨
- 클래스의 변경점이 생겼을때 얼마나 다른 클래스에 영향을 주는가
```
public class SuperRobotFactory extends RobotFactory {
    @Override
    Robot createRobot(String name) {
        switch( name ){
            case "super": return new SuperRobot();
            case "power": return new PowerRobot();
        }
        return null;
    }
}
```
```
public class ModifiedSuperRobotFactory extends RobotFactory {
    @Override
    Robot createRobot(String name) {
        try {
            Class<?> cls = Class.forName(name);
            Object obj = cls.newInstance();
            return (Robot)obj;
        } catch (Exception e) {
            return null;
        }
    }
}
```
```
public class FactoryMain {
    public static void main(String[] args) {

        RobotFactory rf = new SuperRobotFactory();
        Robot r = rf.createRobot("super");
        Robot r2 = rf.createRobot("power");

        System.out.println(r.getName()); // SuperRobot
        System.out.println(r2.getName()); // PowerRobot

        RobotFactory mrf = new ModifiedSuperRobotFactory();
        Robot r3 =  mrf.createRobot("pattern.factory.SuperRobot");
        Robot r4 =  mrf.createRobot("pattern.factory.PowerRobot");

        System.out.println(r3.getName()); // SuperRobot
        System.out.println(r4.getName()); // PowerRobot
    }
}
```


## 템플릿 메서드 패턴 
- 템플릿 메소드 패턴은 "알고리즘의 뼈대"를 맞추는 것에 있습니다. 즉, 전체적인 레이아웃을 통일 시키지만 상속받은 클래스로 하여금 어느정도 유연성을 주도록하는 디자인 패턴입니다.
- 추상 메소드(abstrcat method)와 훅 메소드(hook method)를 적절히 사용해서 전체적인 알고리즘의 뼈대를 유지하되 유연하게 기능을 변경할 수 있도록 하고자 할 때 사용하면 유용하겠네요
```
public class TemplateMain {
    public static void main(String[] args) {
        
        // 전사는 전투 준비를 위해서 
        // 체력을 단련하고, 검을 닦고, 갑옷을 입습니다.
        Warrior warrior = new Warrior();
        warrior.readyToBattle();
        
        // 궁사는 전투 준비를 위해서 
        // 체력을 단련하고, 활을 손질하고, 화살을 준비합니다.
        Archer archer = new Archer();
        archer.readyToBattle();
        
        // 마법사는 전투 준비를 위해서 
        // 체력을 단련하고, 지팡이를 준비하고, 로브를 입습니다.
        Wizard wizard = new Wizard();
        wizard.readyToBattle();
    }
}
```
```
public abstract class Person {

    // 전투를 준비합니다.
    void readyToBattle(){
        startBodyTraining();
        prepareWeapon();
        prepareArmor();
        if( isUsingPrepareOther() ){
            prepareOther();
        }
    }
    
    // 상속 받은 클래스에서 수정할 수 없도록 final 키워드를 붙였습니다.
    final void startBodyTraining(){
        System.out.println("체력을 단련합니다.");
    }
    
    // 무기를 손질할때 사용합니다.
    abstract void prepareWeapon();
    
    // 뭔가를 걸칠 때 사용합니다.
    abstract void prepareArmor();
    
    // 만약 다른 무언가를 사용하려면 true로 바꿔야 합니다.
    // 이 메소드는 "후킹(Hooking)" 용도로 사용합니다.
    boolean isUsingPrepareOther(){
        return false;
    }

    // 다른 무언가가 필요하면 사용합니다.
    // isUsingPrepareOther 값에 의해 오버라이드 해서 사용 합니다.
    void prepareOther(){};
}
```
