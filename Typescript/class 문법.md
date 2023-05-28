
# Class 
```js
interface Shpape {
    getArea(): number; // 해당 인터페이스에서는 getArea 라는 함수가 있어야하며 리턴 값은 숫자
}

class Circle implements Shpape {
    // constructor 의 파라미터 쪽에 public 또는 private accessor 를 사용하면 직접 하나하나 설정해주는 작업을 생략
    //radius: number; // 멤버 변수 radius 값을 설정합니다.

    constructor(private radius: number) {
        this.radius = radius;
    }

    getArea(): number {
        return this.radius * this.radius * Math.PI;
    }
}

class Rectangle implements Shpape {
    //width: number;
    //height: number;
    constructor(private width: number, private height:number) {
        this.width = width;
        this.height = height;
    }
    getArea(): number {
        return this.width * this.height;
    }
}

const shpapes: Shpape[] = [new Circle(5), new Rectangle(10, 5)];

shpapes.forEach(shape => {
    console.log(shape.getArea());
});
```

# Interface
```js
interface Person {
    name: string,
    age? : number // 옵셔널한 값
}

// interface 상속
interface Developer extends Person {
    skills: string[]
}

const person: Person = {
    name: '홍길동',
    age: 20
}

const expert: Developer = {
    name: '김개발',
    skills: ['js', 'react']
}
```

# Interface -> Type
```js
type Person {
    name: string,
    age? : number // 옵셔널한 값
}

// & 는 Intersection 으로서 두개 이상의 타입들을 합쳐줍니다.
type Developer = Person & {
    skills: string[]
}

const person: Person = {
    name: '홍길동',
}

const expert: Developer = {
    name: '김개발',
    skills: ['js', 'react']
}

type People = Person[];
const peole: People = [person, expert];
```
