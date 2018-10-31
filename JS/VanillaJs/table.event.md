# Pure Javscript

### Table row clcik handler
- Row에 이벤트를 걸려고 하는 경우
```
'use strict';

function setPreview() {
    let table = document.querySelector("#xpathTable"), rows = table.getElementsByTagName("tr"), i;
    const xPathIdx = 0;
    for (i = 0; i < rows.length; i++) {
        let currentRow = table.rows[i];
        let createClickHandler =
            function (row) {
                return function () {
                    let cell = row.getElementsByTagName("td")[xPathIdx];
                    console.log(cell.innerHTML);
                };
            };

        currentRow.onclick = createClickHandler(currentRow);
    }
}

function reload() {
    setPreview();
}

document.addEventListener('DOMContentLoaded', reload);
```

### Table column clcik handler
- 특정 컬럼에만 이벤트를 걸고자 하는 경우 
```
'use strict';

function setPreview() {
    let table = document.querySelector("#xpathTable"), rows = table.getElementsByTagName("tr"), i;
    const xPathIdx = 4;
    for (i = 0; i < rows.length; i++) {
        let currentRow = table.rows[i];
        let currentCell = currentRow.cells[xPathIdx];
        currentCell.onclick = function () {
            console.log('addMore');
        };
    }
}

function reload() {
    setPreview();
}

document.addEventListener('DOMContentLoaded', reload);
```
