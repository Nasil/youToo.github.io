
# object
```js
//string 타입의 key, any 타입의 value를 삽입 가능한 객체
let object1: { [key: string]: any } = {};
object1["name"] = "pitter";

//타입이 지정된 객체, 이외의 것들은 삽입 불가능
let object2: {name : string, number : number} = {name:'test', number:1};
object2.name = "pitter";

//string 타입의 key, any 타입의 value를 삽입 가능하며, 기본적으로 명시된 속성이 초기화 되어야함
let object: { [key: string]: any; name: string } = { name: "default" };
object["name"] = "pitter";

```
