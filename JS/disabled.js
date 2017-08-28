var funcUseElement = function (ele, isUse) {
    if (isUse) {
        // 사용.
        // 화면에 element를 표시하고 하위 element 중에서 input과 select를 찾아 disabled 속성을 제거
        ele.show().find('input,select').attr('disabled', false);
    } else {
        // 비사용.
        // 화면에 element를 숨기고 하위 element 중에서 input과 select를 찾아 disabled 속성을 추가
        ele.hide().find('input,select').attr('disabled', true);
    }
};
