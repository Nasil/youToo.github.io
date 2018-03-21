
```javascript
"use strict";

let orgArr = [4,5,3,2,1];
let arr = orgArr;
let i = 0, j = 0, temp = 0;
let n = arr.length;

console.log("=======original=======");
printArr(orgArr,n);

arr = orgArr;
for (i = 0; i < n-1; i++) {
    for (j = i+1; j < n; j++) {
        if (arr[i] > arr[j]) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
console.log("=======selection sort=======");
printArr(arr,n);

arr = orgArr;
for (i = 0; i < n; i++) {
    for (j = 0; j < (n - i - 1); j++) {
        if (arr[j] > arr[j+1]) {
            temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
        }
    }
}
console.log("=======bubble sort=======");
printArr(arr,n);


arr = orgArr;
for (let i = 0; i < n-1; i++) {
    for (let j = i+1; j < n; j++) {
        if (arr[i] > arr[j]) {
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}
console.log("=======select sort=======");
printArr(arr,n);

j = 0;
arr = orgArr;
for (i = 0; i < n; i++) {
    temp = arr[i];
    for(j = i; j > 0 && arr[j -1] > temp ; j--) {
        arr[j] = arr[j-1];
    }
    arr[j] = temp;
}
console.log("=======insertion sort=======");
printArr(arr,arr.length);

function printArr(arr, size) {
    for (let i = 0; i < size ; i++) {
        console.log(arr[i]);
    }
}
```
