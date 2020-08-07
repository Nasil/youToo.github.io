```js
function isObjectEmpty(value) {
  return Object.prototype.toString.call(value) === "[object Object]" && JSON.stringify(value) === "{}"
}

isObjectEmpty({});           // true
isObjectEmpty(new Object()); // true
isObjectEmpty(new String());   // false 
isObjectEmpty(new Number());   // false 
isObjectEmpty(new Boolean());  // false 
isObjectEmpty(new Array());    // false 
isObjectEmpty(new RegExp());   // false 
isObjectEmpty(new Function()); // false 
isObjectEmpty(new Date());     // false 
isObjectEmpty(null);           // false
isObjectEmpty(undefined);      // false
```

```js
function isEmpty(value) {
  return value? false : true;
}

isEmpty({});             // false
isEmpty(new Object());   // false
isEmpty(new String());   // false 
isEmpty(new Number());   // false 
isEmpty(new Boolean());  // false 
isEmpty(new Array());    // false 
isEmpty(new RegExp());   // false 
isEmpty(new Function()); // false 
isEmpty(new Date());     // false 
isEmpty(null);           // true
isEmpty(undefined);      // true

```
