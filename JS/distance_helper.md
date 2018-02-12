

```
 
// Distance between two points
const distance = (a, b) => Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2));

// The maximum value of the array
const maxValue = (array) => array.reduce( function (previous, current) {
    return previous > current ? previous:current;
});

// The minimum value of the array
const minValue = (array) => array.reduce( function (previous, current) {
    return previous > current ? current:previous;
});

// Array Sort and Deduplication
const sortArray = (array) => array.slice().sort(function(a,b){return a - b}).reduce(function(a,b){if (a.slice(-1)[0] !== b) a.push(b);return a;},[]);

// Sort by array value of object
Array.prototype.sortBy = function(p) { return this.slice(0).sort(function(a,b) { return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0; });}

// Angle between two points
function getAngle(a, b){
   let dx = b.x - a.x;
   let dy = b.y - a.y;
   let rad= Math.atan2(dx, dy);
   let degree = (rad*180)/Math.PI ;

   return degree;
}
```
