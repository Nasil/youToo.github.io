function hide_numbers(s){
  var max = s.length;
  var arrHide = s.substring(0, max-4);
  var arrShow = s.substring(max-4, max);
  arrHide = arrHide.replace(/[0-9]/g, '*');
  var result = arrHide + arrShow;
  //함수를 완성해주세요
  console.log(result);
  
  return result;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
console.log("결과 : " + hide_numbers('01033334444'));

