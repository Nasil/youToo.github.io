function productMatrix(A, B) {
	var answer = Array();

	var a = 0;
	for (var a = 0; a < A[0].length; a++) {
		var tmp = Array();
		for (var b = 0; b < B.length; b++ ){ 
			var mul1 = 0;
			for (var i = 0; i < A[0].length; i++) {
				if (A.length <= a || B[0].length <= b) continue;
				var num1 = (A[a][i] * B[i][b]); 
				mul1 += num1;
			}
			if (mul1 == 0) continue;
			tmp.push(mul1);
			answer[a] = tmp;
		}
	}
	
	return answer;
}

// 아래는 테스트로 출력해 보기 위한 코드입니다.
var a = [ [1,2,3],[4,5,6] ];
var b = [ [1,2],[3,4],[5,6] ];
console.log("결과 : " + productMatrix(a, b));
