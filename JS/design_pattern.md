

- constructor 
```
var ConstructorName = (function() {
    'use strict';

    function ConstructorName(args) {
        // enforces new
        if (!(this instanceof ConstructorName)) {
            return new ConstructorName(args);
        }
        // constructor body
        console.log("constructor name");
    }

    ConstructorName.prototype.prdName = function(args) {
        // method body
        console.log("hello anyone this is name");
    };

    ConstructorName.prototype.prdPrice = function(args) {
        // method body
        console.log("hello anyone this is price");
    };

    ConstructorName.prototype.prdShipping = function(args) {
        // method body
        console.log("hello anyone this tis shipping");
    };

    return ConstructorName;
}());

let con = new ConstructorName(); // constructor name
con.prdName(); // hello anyone this is name
con.prdPrice(); // hello anyone this is price
con.prdShipping(); // hello anyone this is shipping
```


- singleton pattern
```
"use strict";

var name = (function() {
    var instance;
    name = function(args) {
        if (instance) {
            return instance;
        }
        instance = this;
        // your code goes here
        console.log("hello Get This");
    };

    return name;
}());

name(); // hello Get This
```

- 
