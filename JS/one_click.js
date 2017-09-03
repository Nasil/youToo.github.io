// Double click prevention
var doubleSubmitFlag = false;
function doubleSubmitCheck() {
    if (doubleSubmitFlag) {
        return doubleSubmitFlag;
    } else {
        doubleSubmitFlag = true;
        return false;
    }
}

// Jquery delegate one click 
$(self.sNameSpace).undelegate('.select', 'change').delegate('.select', 'change', function () {   
    // Change event execute
}

