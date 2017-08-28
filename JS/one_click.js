var doubleSubmitFlag = false;
function doubleSubmitCheck() {
    if (doubleSubmitFlag) {
        return doubleSubmitFlag;
    } else {
        doubleSubmitFlag = true;
        return false;
    }
}
