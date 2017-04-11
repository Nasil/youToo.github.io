'use strict'

// 변수선언
let string = undefined; //테스트할 문자열

// 문자열 초기화
for(let j=0; j<10000; j++) {
    string = "한글백자인가요아닌가여맞나요한글백자인가요아닌가여맞나요한글백자인가요아닌가여맞나요한글백자인가요아";
    //string = "aflkejlgqlweqnlk1j2l451251262lvnlajviajeijgqoijweoqgijweoijgqoiwjeoiqf23blb23l";
}
let stringLength = string.length;
let stringByteLength = 0;

let sType = '2'
if (sType === '1') {

    // 한글/영문/숫자 1Byte
    console.log("Byte : " + stringLength )

} else if (sType === '2') {

    // 한글 2Byte, 영문/숫자 1Byte
    let sStr = string;

    console.time("일반적인FOR방식");
    sStr = sStr.toString();
    let iLen = sStr.length;
    let iUcCharLen = 2;
    let realLength = 0, charCode = -1;

    for (let i = 0; i < iLen; i++) {
        charCode = sStr.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += iUcCharLen;
    }
    console.log(realLength + " Bytes")
    console.timeEnd("일반적인FOR방식");

    console.time("개선된FOR방식");
    stringByteLength = (function(s,b,i,c){
        for(b=i=0;c=s.charCodeAt(i++);b+=c>>7?2:1);
        return b
    })(string);
    console.log(stringByteLength + " Bytes");
    console.timeEnd("개선된FOR방식");

} else {

    // 한글 3Byte, 영문/숫자 1Byte

    console.time("일반적인FOR방식");
    for(let i=0; i<stringLength; i++) {
        if(escape(string.charAt(i)).length >= 4)
            stringByteLength += 3;
        else if(escape(string.charAt(i)) == "%A7")
            stringByteLength += 3;
        else
            if(escape(string.charAt(i)) != "%0D")
                stringByteLength++;
    }
    console.log(stringByteLength + " Bytes")
    console.timeEnd("일반적인FOR방식");

    // 2048(2^11)로 나누었을때 몫이 있으면 3Byte
    // 그보다 작은데 128로(2^7)로 나누었을때 몫이 있으면 2Byte
    // 나머지는 1Byte
    console.time("개선된FOR방식");
    stringByteLength = (function(s,b,i,c){
        for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
        return b
    })(string);
    console.log(stringByteLength + " Bytes");
    console.timeEnd("개선된FOR방식");

    console.time("encodeURI방식");
    stringByteLength = ~-encodeURI(string).split(/%..|./).length;
    console.log(stringByteLength + " Bytes");
    console.timeEnd("encodeURI방식");

    console.time("정규식방식");
    stringByteLength = string.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g,"$&$1$2").length;
    console.log(stringByteLength + " Bytes");
    console.timeEnd("정규식방식");
}

// 결과 
// sType = '2' / string 한글
// 일반적인FOR방식 (2.011ms) -> 개선된FOR방식(0.155ms)
