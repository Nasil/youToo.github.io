
## Loop
```js
let a = ['a', 'b', 'c', 'd' ];
// ES6 
for ( var val of a ) {
    console.log( val );
} // "a" "b" "c" "d"
// pre-ES6 
for ( var idx in a ) {
    console.log( idx );
}  // 0 1 2 3
```

### 변수 서로 변경
```js
let a = 'world', b = 'hello'
[a, b] = [b, a]
console.log(a) // -> hello
console.log(b) // -> world
// Yes, it's magic
```

### Async/Await with Destructuring
```js
const [user, account] = await Promise.all([
  fetch('/user'),
  fetch('/account')
])
```

### array console.log
```js
const a = 5, b = 6, c = 7
console.log({ a, b, c })
```

## Arrow function
```js
// Find max value
const max = (arr) => Math.max(...arr);
max([123, 321, 32]) // outputs: 321
// Sum array
const sum = (arr) => arr.reduce((a, b) => (a + b), 0)
sum([1, 2, 3, 4]) // output: 10
```

## array merge
```js
const one = ['a', 'b', 'c']
const two = ['d', 'e', 'f']
const three = ['g', 'h', 'i']
// Old way #1
const result1 = one.concat(two, three) // ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
// Old way #2
const result2 = [].concat(one, two, three) // ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
// New
const result3 = [...one, ...two, ...three] // ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
```

## array 혹은 object 복사 (clone)
```js
const oldArr = ['a', 'b', 'c']
const oldObj = {1,2,3}
const obj = { ...oldObj }
const arr = [ ...oldArr ] //  ["a", "b", "c"]
```


## object function 에 할당
```js
const getStuffNotBad = (id, force, verbose) => {
  ...do stuff
}
const getStuffAwesome = ({ id, name, force, verbose }) => {
  ...do stuff
}
// Somewhere else in the codebase... WTF is true, true?
getStuffNotBad(150, true, true)
// Somewhere else in the codebase... I ❤ JS!!!
getStuffAwesome({ id: 150, force: true, verbose: true })
```

## 필수값 체크 (validation)
```js
const required = () => {throw new Error('Missing parameter')};
//The below function will trow an error if either "a" or "b" is missing.
const add = (a = required(), b = required()) => a + b;
add(1, 2) //3
add(1) // Error: Missing parameter.
```

## Destructuring
```js
let [ a, b, c ] = [ 6, 2, 9];
console.log(`a=${a}, b=${b}, c=${c}`); //a=6, b=2, c=9
function foo() { return ['car', 'dog', 6 ]; } 
let [ x, y, z ] = foo();
console.log(`x=${x}, y=${y}, z=${z}`);  // x=car, y=dog, z=
```
