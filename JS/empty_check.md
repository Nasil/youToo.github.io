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
function isObjectEmpty2(value) {
  return value? false : true;
}

isObjectEmpty2({});             // false
isObjectEmpty2(new Object());   // false
isObjectEmpty2(new String());   // false 
isObjectEmpty2(new Number());   // false 
isObjectEmpty2(new Boolean());  // false 
isObjectEmpty2(new Array());    // false 
isObjectEmpty2(new RegExp());   // false 
isObjectEmpty2(new Function()); // false 
isObjectEmpty2(new Date());     // false 
isObjectEmpty2(null);           // true
isObjectEmpty2(undefined);      // true

```
