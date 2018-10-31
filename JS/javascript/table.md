# Javscript 순정 



- Table row clcik handler
```
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
